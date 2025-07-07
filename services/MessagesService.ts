import { supabase } from "@/lib/supabase";
import { Conversation } from "@/types/messages";

export class MessagesService {
  // Récupérer toutes les conversations d'un utilisateur
  static async getUserConversations(userId: string) {
    try {
      // Récupérer les matches où l'utilisateur est soit freelancer soit client
      const { data, error } = await supabase
        .from("matches")
        .select(
          `
          id,
          project_id,
          freelancer_id,
          client_id,
          conversations (
            id,
            match_id,
            created_at
          ),
          projects (
            id,
            title
          )
        `
        )
        .or(`freelancer_id.eq.${userId},client_id.eq.${userId}`)
        .not("conversations", "is", null); // Seulement les matches qui ont une conversation

      if (error) {
        console.error(
          "Erreur lors de la récupération des conversations:",
          error
        );
        return { data: [], error: null }; // Retourner un tableau vide au lieu d'une erreur
      }

      // Si pas de données, retourner un tableau vide
      if (!data || data.length === 0) {
        return { data: [], error: null };
      }

      // Enrichir les données avec les informations de l'autre utilisateur
      const enrichedConversations: Conversation[] = [];

      for (const match of data) {
        // Chaque match peut avoir plusieurs conversations, mais on prend la première
        const conversation =
          match.conversations && match.conversations.length > 0
            ? match.conversations[0]
            : null;

        if (!conversation) continue;

        const isFreelancer = match.freelancer_id === userId;
        const otherUserId = isFreelancer
          ? match.client_id
          : match.freelancer_id;

        // Récupérer les infos de l'autre utilisateur
        const { data: otherUserData, error: userError } = await supabase
          .from("profiles")
          .select("id, full_name, avatar_url, role")
          .eq("id", otherUserId)
          .single();

        // Récupérer le dernier message (sans erreur si pas de message)
        const { data: lastMessage } = await supabase
          .from("messages")
          .select("content, created_at, sender_id")
          .eq("conversation_id", conversation.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(); // Utiliser maybeSingle() pour éviter les erreurs

        if (otherUserData && !userError) {
          enrichedConversations.push({
            id: conversation.id,
            match_id: conversation.match_id,
            created_at: conversation.created_at,
            other_user: otherUserData,
            last_message: lastMessage || undefined,
            project:
              match.projects && match.projects.length > 0
                ? {
                    id: match.projects[0].id,
                    title: match.projects[0].title,
                  }
                : undefined,
          });
        }
      }

      return { data: enrichedConversations, error: null };
    } catch (error) {
      console.error("Erreur service conversations:", error);
      return { data: null, error };
    }
  }

  // Récupérer les messages d'une conversation
  static async getConversationMessages(conversationId: string) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select(
          `
          id,
          conversation_id,
          sender_id,
          content,
          created_at,
          profiles (
            full_name,
            avatar_url
          )
        `
        )
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Erreur lors de la récupération des messages:", error);
        return { data: [], error: null }; // Retourner un tableau vide au lieu d'une erreur
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error("Erreur service messages:", error);
      return { data: [], error: null }; // Retourner un tableau vide au lieu d'une erreur
    }
  }

  // Envoyer un message
  static async sendMessage(
    conversationId: string,
    senderId: string,
    content: string
  ) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: senderId,
          content: content.trim(),
        })
        .select()
        .single();

      if (error) {
        console.error("Erreur lors de l'envoi du message:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Erreur service envoi message:", error);
      return { data: null, error };
    }
  }

  // Créer une conversation à partir d'un match
  static async createConversationFromMatch(matchId: string) {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          match_id: matchId,
        })
        .select()
        .single();

      if (error) {
        console.error("Erreur lors de la création de la conversation:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Erreur service création conversation:", error);
      return { data: null, error };
    }
  }

  // Vérifier si une conversation existe pour un match
  static async getConversationByMatch(matchId: string) {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("id, match_id, created_at")
        .eq("match_id", matchId)
        .maybeSingle(); // Utiliser maybeSingle() pour éviter les erreurs si pas de résultat

      if (error) {
        console.error("Erreur lors de la vérification de conversation:", error);
        return { data: null, error: null }; // Ne pas propager l'erreur
      }

      return { data, error: null };
    } catch (error) {
      console.error("Erreur service vérification conversation:", error);
      return { data: null, error: null }; // Ne pas propager l'erreur
    }
  }
}

export const messagesService = MessagesService;
