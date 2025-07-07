import { supabase } from "@/lib/supabase";

class SearchService {
  // Récupérer les utilisateurs matchables selon le rôle
  async getMatchableUsers(currentUserId: string, currentUserRole: string) {
    try {
      if (currentUserRole === "freelance") {
        // Les freelances voient des projets (avec les infos du client)

        // D'abord, récupérer les projets déjà swipés par ce freelance
        const { data: swipedProjects, error: swipeError } = await supabase
          .from("swipes")
          .select("project_id")
          .eq("freelancer_id", currentUserId);

        if (swipeError) {
          console.error("Erreur récupération swipes:", swipeError);
        }

        const swipedProjectIds = swipedProjects?.map((s) => s.project_id) || [];

        // Récupérer les projets non encore swipés
        let query = supabase
          .from("projects")
          .select("*")
          .neq("client_id", currentUserId);

        if (swipedProjectIds.length > 0) {
          query = query.not("id", "in", `(${swipedProjectIds.join(",")})`);
        }

        const { data: projects, error } = await query;

        if (error) {
          console.error("Erreur lors de la récupération des projets:", error);
          return { data: null, error };
        }

        if (!projects || projects.length === 0) {
          return { data: [], error: null };
        }

        // Récupérer les profils des clients séparément
        const clientIds = projects.map((p) => p.client_id);
        const { data: clients, error: clientError } = await supabase
          .from("profiles")
          .select("*")
          .in("id", clientIds);

        if (clientError) {
          console.error("Erreur récupération profiles clients:", clientError);
          return { data: null, error: clientError };
        }

        // Créer un map pour associer client_id -> profile
        const clientMap = new Map();
        clients?.forEach((client) => {
          clientMap.set(client.id, client);
        });

        // Transformer en format UserProfile
        const transformedData = projects.map((project) => {
          const client = clientMap.get(project.client_id);
          return {
            id: client?.id || project.client_id,
            full_name: client?.full_name || "Client inconnu",
            avatar_url: client?.avatar_url,
            role: "client" as const,
            projects: [
              {
                id: project.id,
                title: project.title,
                description: project.description,
                budget: project.budget,
              },
            ],
          };
        });

        return { data: transformedData, error: null };
      } else {
        // Les clients voient des CV (avec les infos du freelance)

        // Pour l'instant, on récupère tous les CV sans filtrage de swipes
        const { data: cvs, error } = await supabase
          .from("cv")
          .select("*")
          .neq("id", currentUserId);

        if (error) {
          console.error("Erreur lors de la récupération des CV:", error);
          return { data: null, error };
        }

        if (!cvs || cvs.length === 0) {
          return { data: [], error: null };
        }

        // Récupérer les profils des freelances séparément
        const freelanceIds = cvs.map((cv) => cv.id);
        const { data: freelances, error: freelanceError } = await supabase
          .from("profiles")
          .select("*")
          .in("id", freelanceIds);

        if (freelanceError) {
          console.error(
            "Erreur récupération profiles freelances:",
            freelanceError
          );
          return { data: null, error: freelanceError };
        }

        // Créer un map pour associer cv.id -> profile
        const freelanceMap = new Map();
        freelances?.forEach((freelance) => {
          freelanceMap.set(freelance.id, freelance);
        });

        // Transformer en format UserProfile
        const transformedData = cvs.map((cv) => {
          const freelance = freelanceMap.get(cv.id);
          return {
            id: freelance?.id || cv.id,
            full_name: freelance?.full_name || "Freelance inconnu",
            avatar_url: freelance?.avatar_url,
            role: "freelance" as const,
            cv: {
              id: cv.id,
              skills: cv.skills,
              expected_salary: cv.expected_salary,
              experience: cv.experience,
            },
          };
        });

        return { data: transformedData, error: null };
      }
    } catch (error) {
      console.error("Erreur générale dans getMatchableUsers:", error);
      return { data: null, error: error as Error };
    }
  }

  // Récupérer les projets déjà swipés par un freelance
  async getSwipedProjects(freelancerId: string) {
    try {
      const { data, error } = await supabase
        .from("swipes")
        .select("project_id")
        .eq("freelancer_id", freelancerId);

      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Enregistrer un swipe
  async recordSwipe(
    userId: string,
    targetUserId: string,
    direction: "left" | "right",
    userRole: string
  ) {
    try {
      if (userRole === "freelance") {
        // Le freelance swipe sur un projet d'un client
        const { data: projects } = await supabase
          .from("projects")
          .select("id")
          .eq("client_id", targetUserId)
          .limit(1);

        if (projects && projects.length > 0) {
          const { error } = await supabase.from("swipes").insert({
            project_id: projects[0].id,
            freelancer_id: userId,
            direction,
          });

          return { error };
        }
      } else if (userRole === "client") {
        // Pour l'instant, on ne fait rien pour les swipes de clients
        // On peut simplement loguer l'action
        console.log(
          `Client ${userId} a swipé ${direction} sur freelance ${targetUserId}`
        );
        return { error: null };
      }

      return { error: null };
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du swipe:", error);
      return { error: error as Error };
    }
  }

  // Vérifier s'il y a un match
  async checkForMatch(userId: string, targetUserId: string, userRole: string) {
    try {
      if (userRole === "freelance") {
        // Simuler un match aléatoire
        const isMatch = Math.random() > 0.7; // 30% de chance de match

        if (isMatch) {
          const { data: projects } = await supabase
            .from("projects")
            .select("id")
            .eq("client_id", targetUserId)
            .limit(1);

          if (projects && projects.length > 0) {
            const { data: match, error } = await supabase
              .from("matches")
              .insert({
                project_id: projects[0].id,
                freelancer_id: userId,
                client_id: targetUserId,
              })
              .select()
              .single();

            if (match && !error) {
              // Créer automatiquement une conversation pour ce match
              const { error: conversationError } = await supabase
                .from("conversations")
                .insert({
                  match_id: match.id,
                });

              if (conversationError) {
                console.error(
                  "Erreur lors de la création de la conversation:",
                  conversationError
                );
              }
            }

            return { data: !error, error };
          }
        }
      }

      return { data: false, error: null };
    } catch (error) {
      return { data: false, error: error as Error };
    }
  }

  // Récupérer les matches d'un utilisateur
  async getUserMatches(userId: string, userRole: string) {
    try {
      let query = supabase.from("matches").select(`
          *,
          project:projects(*),
          freelancer:profiles!matches_freelancer_id_fkey(*),
          client:profiles!matches_client_id_fkey(*)
        `);

      if (userRole === "freelance") {
        query = query.eq("freelancer_id", userId);
      } else {
        query = query.eq("client_id", userId);
      }

      const { data, error } = await query;
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Fonction de test pour forcer un match (pour le développement)
  async forceCreateMatch(
    currentUserId: string,
    targetUserId: string,
    currentUserRole: string
  ) {
    try {
      console.log(
        "Tentative de création de match forcé:",
        currentUserId,
        "->",
        targetUserId
      );

      if (currentUserRole === "freelance") {
        // Récupérer un projet du client cible
        const { data: projects } = await supabase
          .from("projects")
          .select("id")
          .eq("client_id", targetUserId)
          .limit(1);

        if (!projects || projects.length === 0) {
          console.log("Aucun projet trouvé pour le client:", targetUserId);
          return {
            data: null,
            error: new Error("Aucun projet trouvé pour ce client"),
          };
        }

        // Vérifier s'il n'y a pas déjà un match
        const { data: existingMatch } = await supabase
          .from("matches")
          .select("id")
          .eq("project_id", projects[0].id)
          .eq("freelancer_id", currentUserId)
          .eq("client_id", targetUserId)
          .single();

        if (existingMatch) {
          console.log("Match déjà existant");
          return { data: existingMatch, error: null };
        }

        // Créer le match
        const { data: match, error: matchError } = await supabase
          .from("matches")
          .insert({
            project_id: projects[0].id,
            freelancer_id: currentUserId,
            client_id: targetUserId,
          })
          .select()
          .single();

        if (matchError) {
          console.error("Erreur création match:", matchError);
          return { data: null, error: matchError };
        }

        console.log("Match créé:", match);

        // Créer automatiquement une conversation pour ce match
        const { data: conversation, error: conversationError } = await supabase
          .from("conversations")
          .insert({
            match_id: match.id,
          })
          .select()
          .single();

        if (conversationError) {
          console.error("Erreur création conversation:", conversationError);
          return { data: match, error: conversationError };
        }

        console.log("Conversation créée:", conversation);

        return { data: { match, conversation }, error: null };
      } else {
        // Pour les clients, récupérer un CV de freelance
        const { data: cvs } = await supabase
          .from("cv")
          .select("id")
          .eq("id", targetUserId)
          .limit(1);

        if (!cvs || cvs.length === 0) {
          return {
            data: null,
            error: new Error("Aucun CV trouvé pour ce freelance"),
          };
        }

        // Récupérer un projet du client actuel
        const { data: projects } = await supabase
          .from("projects")
          .select("id")
          .eq("client_id", currentUserId)
          .limit(1);

        if (!projects || projects.length === 0) {
          return {
            data: null,
            error: new Error("Aucun projet trouvé pour vous"),
          };
        }

        // Vérifier s'il n'y a pas déjà un match
        const { data: existingMatch } = await supabase
          .from("matches")
          .select("id")
          .eq("project_id", projects[0].id)
          .eq("freelancer_id", targetUserId)
          .eq("client_id", currentUserId)
          .single();

        if (existingMatch) {
          return { data: existingMatch, error: null };
        }

        // Créer le match
        const { data: match, error: matchError } = await supabase
          .from("matches")
          .insert({
            project_id: projects[0].id,
            freelancer_id: targetUserId,
            client_id: currentUserId,
          })
          .select()
          .single();

        if (matchError) {
          return { data: null, error: matchError };
        }

        // Créer automatiquement une conversation pour ce match
        const { data: conversation, error: conversationError } = await supabase
          .from("conversations")
          .insert({
            match_id: match.id,
          })
          .select()
          .single();

        if (conversationError) {
          return { data: match, error: conversationError };
        }

        return { data: { match, conversation }, error: null };
      }
    } catch (error) {
      console.error("Erreur générale forceCreateMatch:", error);
      return { data: null, error: error as Error };
    }
  }
}

export const searchService = new SearchService();
