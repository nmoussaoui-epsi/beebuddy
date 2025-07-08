import { supabase } from "@/lib/supabase";

// Données de test pour les freelances
const freelanceData = [
  {
    email: "alex.martin@example.com",
    fullName: "Alex Martin",
    skills: ["React", "Node.js", "TypeScript"],
    expectedSalary: 45000,
    experience: "3 ans d'expérience en développement frontend et backend",
  },
  {
    email: "sarah.dubois@example.com",
    fullName: "Sarah Dubois",
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite"],
    expectedSalary: 40000,
    experience: "5 ans d'expérience en design UI/UX pour applications mobiles",
  },
  {
    email: "julien.bernard@example.com",
    fullName: "Julien Bernard",
    skills: ["Python", "Django", "PostgreSQL"],
    expectedSalary: 50000,
    experience: "4 ans d'expérience en développement backend",
  },
  {
    email: "marie.leroy@example.com",
    fullName: "Marie Leroy",
    skills: ["Marketing Digital", "SEO", "Google Ads"],
    expectedSalary: 35000,
    experience: "2 ans d'expérience en marketing digital",
  },
  {
    email: "pierre.moreau@example.com",
    fullName: "Pierre Moreau",
    skills: ["Flutter", "Dart", "Firebase"],
    expectedSalary: 48000,
    experience: "6 ans d'expérience en développement mobile",
  },
  {
    email: "camille.simon@example.com",
    fullName: "Camille Simon",
    skills: ["Data Science", "Python", "Machine Learning"],
    expectedSalary: 55000,
    experience: "3 ans d'expérience en analyse de données",
  },
  {
    email: "thomas.roux@example.com",
    fullName: "Thomas Roux",
    skills: ["DevOps", "Docker", "Kubernetes"],
    expectedSalary: 60000,
    experience: "5 ans d'expérience en infrastructure et déploiement",
  },
  {
    email: "laura.michel@example.com",
    fullName: "Laura Michel",
    skills: ["Content Writing", "Copywriting", "SEO"],
    expectedSalary: 30000,
    experience: "4 ans d'expérience en rédaction web",
  },
  {
    email: "kevin.garcia@example.com",
    fullName: "Kevin Garcia",
    skills: ["iOS Development", "Swift", "SwiftUI"],
    expectedSalary: 52000,
    experience: "4 ans d'expérience en développement iOS",
  },
  {
    email: "amelie.petit@example.com",
    fullName: "Amélie Petit",
    skills: ["Graphic Design", "Branding", "Illustration"],
    expectedSalary: 38000,
    experience: "3 ans d'expérience en design graphique",
  },
];

// Données de test pour les clients
const clientData = [
  {
    email: "startup.techno@example.com",
    fullName: "TechnoStart SARL",
    projects: [
      {
        title: "Application mobile e-commerce",
        description: "Développement d'une application mobile pour vente en ligne avec paiement intégré",
        budget: 15000,
      },
      {
        title: "Site web vitrine",
        description: "Création d'un site web moderne pour présenter nos services",
        budget: 5000,
      },
    ],
  },
  {
    email: "agence.creative@example.com",
    fullName: "Creative Agency",
    projects: [
      {
        title: "Refonte identité visuelle",
        description: "Modernisation complète de notre charte graphique et logo",
        budget: 8000,
      },
    ],
  },
  {
    email: "ecommerce.shop@example.com",
    fullName: "E-Shop Solutions",
    projects: [
      {
        title: "Optimisation SEO",
        description: "Amélioration du référencement naturel de notre boutique en ligne",
        budget: 3000,
      },
      {
        title: "Campagne publicitaire",
        description: "Création et gestion de campagnes Google Ads et Facebook Ads",
        budget: 4500,
      },
    ],
  },
  {
    email: "restaurant.gourmet@example.com",
    fullName: "Restaurant Le Gourmet",
    projects: [
      {
        title: "Application de commande",
        description: "Développement d'une app mobile pour commande et livraison",
        budget: 12000,
      },
    ],
  },
  {
    email: "consulting.business@example.com",
    fullName: "Business Consulting Pro",
    projects: [
      {
        title: "Plateforme de formation",
        description: "Création d'une plateforme e-learning pour nos formations",
        budget: 20000,
      },
    ],
  },
  {
    email: "fitness.center@example.com",
    fullName: "FitCenter Gym",
    projects: [
      {
        title: "App de suivi fitness",
        description: "Application mobile pour suivi des entraînements et nutrition",
        budget: 18000,
      },
      {
        title: "Site web responsive",
        description: "Nouveau site web adaptatif avec système de réservation",
        budget: 7000,
      },
    ],
  },
  {
    email: "medical.clinic@example.com",
    fullName: "Clinique Médicale Moderne",
    projects: [
      {
        title: "Système de rendez-vous",
        description: "Plateforme de prise de rendez-vous en ligne pour patients",
        budget: 10000,
      },
    ],
  },
  {
    email: "fashion.boutique@example.com",
    fullName: "Boutique Fashion Style",
    projects: [
      {
        title: "E-commerce mode",
        description: "Boutique en ligne pour vêtements avec essayage virtuel",
        budget: 25000,
      },
    ],
  },
  {
    email: "education.academy@example.com",
    fullName: "Digital Academy",
    projects: [
      {
        title: "Plateforme éducative",
        description: "LMS complet pour cours en ligne avec vidéos et quiz",
        budget: 30000,
      },
    ],
  },
  {
    email: "immobilier.premium@example.com",
    fullName: "Premium Immobilier",
    projects: [
      {
        title: "Portail immobilier",
        description: "Site web avec recherche avancée et visite virtuelle 360°",
        budget: 22000,
      },
      {
        title: "App mobile agents",
        description: "Application mobile pour nos agents immobiliers",
        budget: 14000,
      },
    ],
  },
];

const defaultPassword = "password123";

// Variable pour stocker les credentials créés
let createdCredentials: Array<{ email: string; password: string; role: string; fullName: string }> = [];

export async function createTestUsers() {
  try {
    console.log("🚀 Début de la création des utilisateurs de test...");
    createdCredentials = []; // Reset des credentials

    // Créer les freelances
    console.log("👨‍💻 Création des freelances...");
    for (const freelance of freelanceData) {
      try {
        // 1. Créer le compte utilisateur
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: freelance.email,
          password: defaultPassword,
        });

        if (authError) {
          console.error(`❌ Erreur création auth pour ${freelance.email}:`, authError.message);
          continue;
        }

        if (!authData.user) {
          console.error(`❌ Pas d'utilisateur créé pour ${freelance.email}`);
          continue;
        }

        console.log(`✅ Compte créé pour ${freelance.email}`);

        // 2. Créer le profil
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          full_name: freelance.fullName,
          role: "freelance",
          avatar_url: `https://www.gravatar.com/avatar/${Math.random().toString(36).substr(2, 9)}?d=identicon`,
        });

        if (profileError) {
          console.error(`❌ Erreur création profil pour ${freelance.email}:`, profileError.message);
          continue;
        }

        // 3. Créer le CV
        const { error: cvError } = await supabase.from("cv").insert({
          id: authData.user.id,
          skills: freelance.skills,
          expected_salary: freelance.expectedSalary,
          experience: freelance.experience,
        });

        if (cvError) {
          console.error(`❌ Erreur création CV pour ${freelance.email}:`, cvError.message);
          continue;
        }

        console.log(`✅ Freelance ${freelance.fullName} créé avec succès`);

        // Ajouter aux credentials
        createdCredentials.push({
          email: freelance.email,
          password: defaultPassword,
          role: "freelance",
          fullName: freelance.fullName,
        });
      } catch (error) {
        console.error(`❌ Erreur générale pour ${freelance.email}:`, error);
      }
    }

    // Créer les clients
    console.log("\n🏢 Création des clients...");
    for (const client of clientData) {
      try {
        // 1. Créer le compte utilisateur
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: client.email,
          password: defaultPassword,
        });

        if (authError) {
          console.error(`❌ Erreur création auth pour ${client.email}:`, authError.message);
          continue;
        }

        if (!authData.user) {
          console.error(`❌ Pas d'utilisateur créé pour ${client.email}`);
          continue;
        }

        console.log(`✅ Compte créé pour ${client.email}`);

        // 2. Créer le profil
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          full_name: client.fullName,
          role: "client",
          avatar_url: `https://www.gravatar.com/avatar/${Math.random().toString(36).substr(2, 9)}?d=identicon`,
        });

        if (profileError) {
          console.error(`❌ Erreur création profil pour ${client.email}:`, profileError.message);
          continue;
        }

        // 3. Créer les projets
        for (const project of client.projects) {
          const { error: projectError } = await supabase.from("projects").insert({
            client_id: authData.user.id,
            title: project.title,
            description: project.description,
            budget: project.budget,
          });

          if (projectError) {
            console.error(`❌ Erreur création projet "${project.title}" pour ${client.email}:`, projectError.message);
          } else {
            console.log(`  ✅ Projet "${project.title}" créé`);
          }
        }

        console.log(`✅ Client ${client.fullName} créé avec succès`);

        // Ajouter aux credentials
        createdCredentials.push({
          email: client.email,
          password: defaultPassword,
          role: "client",
          fullName: client.fullName,
        });
      } catch (error) {
        console.error(`❌ Erreur générale pour ${client.email}:`, error);
      }
    }

    console.log("\n🎉 Création des utilisateurs terminée !");
    console.log(`✅ ${createdCredentials.length} utilisateurs créés au total`);
    console.log("\n💡 Utilisez 'Afficher les identifiants' pour voir la liste complète des comptes");
  } catch (error) {
    console.error("❌ Erreur générale lors de la création des utilisateurs:", error);
    throw error;
  }
}

export async function showTestCredentials() {
  try {
    console.log("\n📋 IDENTIFIANTS DES COMPTES DE TEST");
    console.log("=====================================");

    if (createdCredentials.length === 0) {
      console.log("⚠️ Aucun credential en mémoire. Vous devez d'abord créer les utilisateurs.");

      // Essayer de récupérer depuis la base de données
      console.log("🔍 Récupération depuis la base de données...");

      const { data: profiles, error } = await supabase.from("profiles").select("full_name, role").order("role", { ascending: false });

      if (error) {
        console.error("❌ Erreur récupération profiles:", error.message);
        return;
      }

      if (!profiles || profiles.length === 0) {
        console.log("❌ Aucun profil trouvé dans la base de données");
        return;
      }

      console.log("\n👥 UTILISATEURS DANS LA BASE DE DONNÉES:");
      console.log("=========================================");

      const freelances = profiles.filter((p) => p.role === "freelance");
      const clients = profiles.filter((p) => p.role === "client");

      if (freelances.length > 0) {
        console.log("\n👨‍💻 FREELANCES:");
        freelances.forEach((profile, index) => {
          console.log(`${index + 1}. ${profile.full_name}`);
        });
      }

      if (clients.length > 0) {
        console.log("\n🏢 CLIENTS:");
        clients.forEach((profile, index) => {
          console.log(`${index + 1}. ${profile.full_name}`);
        });
      }

      console.log("\n⚠️ Note: Les emails et mots de passe ne sont pas accessibles depuis la base de données pour des raisons de sécurité.");
      console.log("💡 Mot de passe par défaut pour tous les comptes: password123");

      return;
    }

    // Afficher les credentials en mémoire
    const freelances = createdCredentials.filter((c) => c.role === "freelance");
    const clients = createdCredentials.filter((c) => c.role === "client");

    console.log(`\n👨‍💻 FREELANCES (${freelances.length}):`);
    console.log("====================");
    freelances.forEach((cred, index) => {
      console.log(`${index + 1}. ${cred.fullName}`);
      console.log(`   📧 Email: ${cred.email}`);
      console.log(`   🔑 Mot de passe: ${cred.password}`);
      console.log("");
    });

    console.log(`\n🏢 CLIENTS (${clients.length}):`);
    console.log("================");
    clients.forEach((cred, index) => {
      console.log(`${index + 1}. ${cred.fullName}`);
      console.log(`   📧 Email: ${cred.email}`);
      console.log(`   🔑 Mot de passe: ${cred.password}`);
      console.log("");
    });

    console.log("💡 Vous pouvez maintenant utiliser ces identifiants pour vous connecter à l'application !");
  } catch (error) {
    console.error("❌ Erreur lors de l'affichage des credentials:", error);
  }
}
