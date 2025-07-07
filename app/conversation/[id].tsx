import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
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

export default function ConversationScreen() {
  const { profile } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const conversationId = params.id as string;
  const otherUserName = params.otherUserName as string;
  const otherUserAvatar = params.otherUserAvatar as string;
  const projectTitle = params.projectTitle as string;

  const loadMessages = useCallback(async () => {
    if (!conversationId) return;

    setLoading(true);
    const { data } = await messagesService.getConversationMessages(
      conversationId
    );
    if (data) {
      setMessages(data as unknown as MessageWithSender[]);
      // Scroll vers le bas après chargement
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
    setLoading(false);
  }, [conversationId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !profile || sending) return;

    setSending(true);
    const messageContent = newMessage.trim();
    setNewMessage("");

    const { data, error } = await messagesService.sendMessage(
      conversationId,
      profile.id,
      messageContent
    );

    if (data && !error) {
      // Ajouter le message localement pour un feedback immédiat
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

      // Scroll vers le bas
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } else {
      // Remettre le texte en cas d'erreur
      setNewMessage(messageContent);
    }

    setSending(false);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
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
        300000; // 5 minutes

    return (
      <View>
        {showTime && (
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(item.created_at)}</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Image
            source={{ uri: otherUserAvatar }}
            style={styles.headerAvatar}
          />
          <View style={styles.headerText}>
            <Text style={styles.headerName}>{otherUserName}</Text>
            {projectTitle && (
              <Text style={styles.headerProject}>📋 {projectTitle}</Text>
            )}
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
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

        {/* Input */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
  },
  headerProject: {
    fontSize: 14,
    color: "#0066CC",
    marginTop: 2,
  },
  chatContainer: {
    flex: 1,
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
  timeText: {
    fontSize: 12,
    color: "#6C757D",
    backgroundColor: "#E9ECEF",
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
    backgroundColor: "#007AFF",
    marginLeft: 40,
  },
  otherMessageBubble: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: "#FFFFFF",
  },
  otherMessageText: {
    color: "#212529",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: "#F8F9FA",
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: "#007AFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#E9ECEF",
  },
});
