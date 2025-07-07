import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { messagesService } from "../../services/MessagesService";
import { Conversation } from "../../types/messages";

interface MessageWithSender {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

export default function MessagesScreen() {
  const { profile } = useAuth();
  const { setIsInChat } = useChat();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const loadConversations = useCallback(async () => {
    if (!profile) return;

    setLoading(true);
    const { data } = await messagesService.getUserConversations(profile.id);
    if (data) {
      setConversations(data);
    }
    setLoading(false);
  }, [profile]);

  const loadMessages = useCallback(async (conversationId: string) => {
    const { data } = await messagesService.getConversationMessages(
      conversationId
    );
    if (data) {
      setMessages(data as unknown as MessageWithSender[]);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString("fr-FR", { weekday: "short" });
    } else {
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      });
    }
  };

  const openConversation = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsInChat(true); // Masquer la bottom bar
    await loadMessages(conversation.id);
  };

  const goBackToList = () => {
    setSelectedConversation(null);
    setIsInChat(false); // Afficher la bottom bar
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !profile || !selectedConversation || sending)
      return;

    setSending(true);
    const messageContent = newMessage.trim();
    setNewMessage("");

    const { data, error } = await messagesService.sendMessage(
      selectedConversation.id,
      profile.id,
      messageContent
    );

    if (data && !error) {
      const newMsg: MessageWithSender = {
        id: data.id,
        conversation_id: data.conversation_id,
        sender_id: data.sender_id,
        content: data.content,
        created_at: data.created_at,
        profiles: {
          full_name: profile.full_name,
          avatar_url: profile.avatar_url || "",
        },
      };

      setMessages((prev) => [...prev, newMsg]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } else {
      setNewMessage(messageContent);
    }

    setSending(false);
  };

  const renderConversationItem = ({ item }: { item: Conversation }) => {
    const isLastMessageFromMe = item.last_message?.sender_id === profile?.id;

    return (
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => openConversation(item)}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: item.other_user.avatar_url }}
            style={styles.avatar}
          />
          <View
            style={[
              styles.roleIndicator,
              {
                backgroundColor:
                  item.other_user.role === "freelance" ? "#4CAF50" : "#2196F3",
              },
            ]}
          />
        </View>

        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={styles.userName}>{item.other_user.full_name}</Text>
            {item.last_message && (
              <Text style={styles.timeText}>
                {formatTime(item.last_message.created_at)}
              </Text>
            )}
          </View>

          {item.project && (
            <Text style={styles.projectTitle}>📋 {item.project.title}</Text>
          )}

          {item.last_message ? (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {isLastMessageFromMe ? "Vous: " : ""}
              {item.last_message.content}
            </Text>
          ) : (
            <Text style={styles.noMessage}>
              Nouveau match ! Dites bonjour 👋
            </Text>
          )}
        </View>

        <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
      </TouchableOpacity>
    );
  };

  const renderMessage = ({
    item,
    index,
  }: {
    item: MessageWithSender;
    index: number;
  }) => {
    const isMyMessage = item.sender_id === profile?.id;
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const showAvatar = !prevMessage || prevMessage.sender_id !== item.sender_id;
    const showTime =
      !prevMessage ||
      new Date(item.created_at).getTime() -
        new Date(prevMessage.created_at).getTime() >
        300000;

    return (
      <View>
        {showTime && (
          <View style={styles.timeContainer}>
            <Text style={styles.messageTimeText}>
              {formatTime(item.created_at)}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.messageContainer,
            isMyMessage
              ? styles.myMessageContainer
              : styles.otherMessageContainer,
          ]}
        >
          {!isMyMessage && showAvatar && (
            <Image
              source={{ uri: item.profiles.avatar_url }}
              style={styles.messageAvatar}
            />
          )}

          {!isMyMessage && !showAvatar && <View style={styles.avatarSpacer} />}

          <View
            style={[
              styles.messageBubble,
              isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isMyMessage ? styles.myMessageText : styles.otherMessageText,
              ]}
            >
              {item.content}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Chargement des conversations...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Vue de conversation individuelle
  if (selectedConversation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity style={styles.backButton} onPress={goBackToList}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.chatHeaderContent}>
            <Image
              source={{ uri: selectedConversation.other_user.avatar_url }}
              style={styles.chatHeaderAvatar}
            />
            <View style={styles.chatHeaderText}>
              <Text style={styles.chatHeaderName}>
                {selectedConversation.other_user.full_name}
              </Text>
              {selectedConversation.project && (
                <Text style={styles.chatHeaderProject}>
                  📋 {selectedConversation.project.title}
                </Text>
              )}
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.chatContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: false })
            }
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Tapez votre message..."
              placeholderTextColor="#999"
              multiline
              maxLength={1000}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!newMessage.trim() || sending) && styles.sendButtonDisabled,
              ]}
              onPress={sendMessage}
              disabled={!newMessage.trim() || sending}
            >
              <Ionicons
                name="send"
                size={20}
                color={!newMessage.trim() || sending ? "#999" : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Vue de liste des conversations
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>
          {conversations.length} conversation
          {conversations.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {conversations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubbles-outline" size={80} color="#DDD" />
          <Text style={styles.emptyTitle}>Aucune conversation</Text>
          <Text style={styles.emptySubtitle}>
            Commencez à swiper pour créer des matchs et démarrer des
            conversations !
          </Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A", // Fond sombre
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: "#2C2C2C", // Header sombre
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3A",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF", // Texte blanc
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#A0A0A0", // Texte gris clair
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
  },
  loadingText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: "#1A1A1A",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#A0A0A0", // Texte gris clair
    textAlign: "center",
    lineHeight: 22,
  },
  listContent: {
    paddingBottom: 100,
  },
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C", // Fond sombre pour les conversations
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3A", // Bordure sombre
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3A3A3A", // Avatar placeholder sombre
  },
  roleIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#2C2C2C", // Bordure adaptée au fond
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF", // Texte blanc
  },
  timeText: {
    fontSize: 14,
    color: "#A0A0A0", // Texte gris clair
  },
  projectTitle: {
    fontSize: 14,
    color: "#ebff56", // Nouvelle couleur d'accent
    marginBottom: 4,
    fontWeight: "500",
  },
  lastMessage: {
    fontSize: 15,
    color: "#CCCCCC", // Texte gris plus clair
    lineHeight: 20,
  },
  noMessage: {
    fontSize: 15,
    color: "#ebff56", // Nouvelle couleur d'accent
    fontStyle: "italic",
  },
  // Styles pour le chat
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C", // Header chat sombre
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3A",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  chatHeaderContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  chatHeaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatHeaderText: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF", // Texte blanc
  },
  chatHeaderProject: {
    fontSize: 14,
    color: "#ebff56", // Nouvelle couleur d'accent
    marginTop: 2,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#1A1A1A", // Fond sombre pour le chat
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  timeContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  messageTimeText: {
    fontSize: 12,
    color: "#A0A0A0", // Texte gris clair
    backgroundColor: "#3A3A3A", // Fond sombre pour l'heure
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 2,
  },
  myMessageContainer: {
    justifyContent: "flex-end",
  },
  otherMessageContainer: {
    justifyContent: "flex-start",
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    alignSelf: "flex-end",
  },
  avatarSpacer: {
    width: 40,
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 4,
  },
  myMessageBubble: {
    backgroundColor: "#ebff56", // Nouvelle couleur d'accent pour mes messages
    marginLeft: 40,
  },
  otherMessageBubble: {
    backgroundColor: "#2C2C2C", // Fond sombre pour les messages reçus
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: "#000000", // Texte noir sur fond jaune-vert
  },
  otherMessageText: {
    color: "#FFFFFF", // Texte blanc sur fond sombre
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#2C2C2C", // Fond sombre pour l'input
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#3A3A3A",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#3A3A3A", // Bordure sombre
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: "#1A1A1A", // Fond de l'input sombre
    color: "#FFFFFF", // Texte blanc
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: "#ebff56", // Nouvelle couleur d'accent pour le bouton envoyer
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#3A3A3A", // Bouton désactivé sombre
  },
});
