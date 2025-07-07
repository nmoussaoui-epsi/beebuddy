import { ProfileIncompleteAlert } from "@/components/ui/ProfileIncompleteAlert";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface TipCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: any;
  content: {
    intro: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
  };
}

// Conseils pour freelances
const freelanceTips: TipCard[] = [
  {
    id: "1",
    title: "Optimisez votre profil",
    description: "Un profil complet augmente vos chances de match de 70%",
    icon: "person-circle",
    image: require("../../assets/images/reviewing portfolios.png"),
    content: {
      intro:
        "Dans le monde du freelancing, votre profil est votre carte de visite numérique. C'est souvent la première impression que vous donnez aux clients potentiels. Un profil bien optimisé peut faire la différence entre obtenir un projet ou passer à côté d'une opportunité en or.",
      sections: [
        {
          title: "📝 Description détaillée",
          content:
            "Rédigez une description qui raconte votre histoire professionnelle. Évitez les listes de compétences brutes : racontez plutôt comment vous avez aidé vos précédents clients à atteindre leurs objectifs. Utilisez des exemples concrets et des résultats chiffrés quand c'est possible.",
        },
        {
          title: "🎯 Compétences stratégiques",
          content:
            "Ne listez pas toutes vos compétences ! Concentrez-vous sur 5-7 compétences clés qui correspondent vraiment à votre expertise. Classez-les par ordre d'importance et ajoutez votre niveau d'expérience pour chacune.",
        },
        {
          title: "🏆 Portfolio percutant",
          content:
            "Sélectionnez 3-5 de vos meilleurs projets qui démontrent la diversité de vos compétences. Pour chaque projet, expliquez le défi, votre approche, et les résultats obtenus. Les clients veulent voir des preuves concrètes de votre savoir-faire.",
        },
        {
          title: "⭐ Témoignages authentiques",
          content:
            "Les avis clients sont cruciaux. N'hésitez pas à demander des recommandations à vos anciens clients. Un témoignage détaillé vaut mieux que dix avis génériques.",
        },
      ],
      conclusion:
        "Rappelez-vous : votre profil doit refléter votre personnalité professionnelle tout en inspirant confiance. Mettez-le à jour régulièrement pour qu'il reste actuel et attractif !",
    },
  },
  {
    id: "2",
    title: "Fixez le bon tarif",
    description: "Trouvez l'équilibre entre compétitivité et valorisation",
    icon: "cash",
    image: require("../../assets/images/project planning.jpg"),
    content: {
      intro:
        "Fixer ses tarifs est l'un des défis les plus délicats du freelancing. Trop élevé et vous risquez de perdre des clients, trop bas et vous dévalorisez votre travail. Voici comment trouver le juste équilibre.",
      sections: [
        {
          title: "🔍 Recherche de marché",
          content:
            "Analysez les tarifs pratiqués dans votre domaine et votre région. Consultez les plateformes freelance, les groupes professionnels et n'hésitez pas à échanger avec d'autres freelances. Créez-vous une grille tarifaire basée sur votre expérience.",
        },
        {
          title: "📊 Méthodes de tarification",
          content:
            "Vous pouvez facturer à l'heure, au projet, ou créer des forfaits. Le tarif horaire convient pour des missions évolutives, le forfait pour des projets bien définis. Considérez aussi la valeur ajoutée que vous apportez, pas seulement le temps passé.",
        },
        {
          title: "🎯 Stratégie progressive",
          content:
            "Commencez légèrement en dessous du marché pour décrocher vos premiers clients et construire votre réputation. Augmentez progressivement vos tarifs tous les 6 mois en fonction de votre expérience et de la demande.",
        },
        {
          title: "💰 Facteurs à considérer",
          content:
            "N'oubliez pas d'inclure dans vos tarifs : les charges sociales, les congés, la formation continue, le temps commercial, et les outils professionnels. Votre tarif doit couvrir plus que votre simple temps de travail.",
        },
      ],
      conclusion:
        "La tarification évolue avec votre expertise. N'ayez pas peur d'ajuster vos prix à mesure que votre valeur sur le marché augmente. Un freelance bien payé est un freelance motivé !",
    },
  },
  {
    id: "3",
    title: "Répondez rapidement",
    description:
      "Les premiers à répondre ont 5x plus de chances d'être sélectionnés",
    icon: "flash",
    image: require("../../assets/images/teamwork conversation.jpeg"),
    content: {
      intro:
        "Dans le monde numérique d'aujourd'hui, la rapidité de réponse est devenue un avantage concurrentiel majeur. Les clients apprécient la réactivité car elle témoigne de votre professionnalisme et de votre engagement.",
      sections: [
        {
          title: "⏰ Temps de réponse optimal",
          content:
            "Idéalement, répondez dans les 2 heures pendant les heures ouvrables. Si ce n'est pas possible, envoyez au moins un accusé de réception rapide pour confirmer que vous avez bien reçu le message et indiquer quand vous pourrez répondre en détail.",
        },
        {
          title: "📱 Organisation et outils",
          content:
            "Configurez des notifications pour vos emails et messages professionnels. Utilisez des applications de gestion de projets qui vous alertent en temps réel. Mais attention à ne pas devenir esclave de vos notifications !",
        },
        {
          title: "🎯 Qualité vs Rapidité",
          content:
            "Une réponse rapide ne doit pas être bâclée. Prenez le temps de bien lire la demande, posez les bonnes questions et proposez une solution réfléchie. Une réponse rapide mais pertinente vaut mieux qu'une réponse immédiate mais vide.",
        },
        {
          title: "🔄 Suivi proactif",
          content:
            "N'attendez pas que le client vous relance. Envoyez des points d'étape réguliers, partagez vos avancements et prévenez en cas de retard potentiel. La communication proactive renforce la confiance.",
        },
      ],
      conclusion:
        "La réactivité se cultive et devient un réflexe. Elle fait partie intégrante de votre service client et peut devenir votre signature professionnelle distinctive.",
    },
  },
];

// Conseils pour clients
const clientTips: TipCard[] = [
  {
    id: "1",
    title: "Décrivez bien votre projet",
    description: "Un brief clair attire les meilleurs freelances",
    icon: "document-text",
    image: require("../../assets/images/project planning.jpg"),
    content: {
      intro:
        "Un projet bien défini est à moitié réussi. Plus votre description est précise et complète, plus vous attirerez des freelances qualifiés qui comprendront exactement vos besoins et pourront vous proposer des solutions adaptées.",
      sections: [
        {
          title: "🎯 Objectifs et contexte",
          content:
            "Commencez par expliquer le contexte de votre projet : pourquoi ce besoin existe-t-il ? Quels sont vos objectifs business ? Qui est votre audience cible ? Ces informations aident le freelance à mieux comprendre les enjeux et à proposer des solutions pertinentes.",
        },
        {
          title: "📋 Spécifications techniques",
          content:
            "Détaillez les aspects techniques : technologies préférées, contraintes existantes, intégrations nécessaires. Si vous n'êtes pas technique, décrivez fonctionnellement ce que vous voulez obtenir. N'hésitez pas à fournir des exemples ou références.",
        },
        {
          title: "💰 Budget et délais",
          content:
            "Soyez transparent sur votre budget et vos contraintes de timing. Cela permet aux freelances de proposer des solutions adaptées à vos moyens et d'organiser leur planning. Un budget réaliste attire des professionnels sérieux.",
        },
        {
          title: "📊 Livrables attendus",
          content:
            "Précisez ce que vous attendez comme livraisons : maquettes, code source, documentation, formation ? Définissez aussi les critères de validation et les étapes de validation. Cela évite les malentendus plus tard.",
        },
      ],
      conclusion:
        "Un brief détaillé vous fait gagner du temps en attirant les bons profils et en évitant les allers-retours. Investissez du temps dans la rédaction, cela paiera toujours !",
    },
  },
  {
    id: "2",
    title: "Vérifiez les portfolios",
    description: "Les réalisations passées prédisent la qualité future",
    icon: "images",
    image: require("../../assets/images/reviewing portfolios.png"),
    content: {
      intro:
        "Le portfolio d'un freelance est sa vitrine professionnelle. Savoir l'analyser vous permet de jauger non seulement ses compétences techniques, mais aussi sa capacité à comprendre et résoudre des problématiques similaires à la vôtre.",
      sections: [
        {
          title: "🔍 Analyse de la qualité",
          content:
            "Regardez la cohérence visuelle, la finition des détails, l'ergonomie des interfaces. Un bon freelance soigne ses réalisations et les présente de manière professionnelle. Attention aux portfolios avec trop peu de projets ou tous très similaires.",
        },
        {
          title: "🎯 Pertinence sectorielle",
          content:
            "Cherchez des projets dans votre secteur d'activité ou avec des problématiques similaires. Un freelance qui a déjà travaillé dans votre domaine comprendra mieux vos enjeux spécifiques et les contraintes de votre marché.",
        },
        {
          title: "📊 Résultats et métriques",
          content:
            "Les meilleurs portfolios incluent des résultats mesurables : augmentation du trafic, amélioration des conversions, réduction des coûts. Ces données prouvent que le freelance pense business et pas seulement technique.",
        },
        {
          title: "🔗 Vérification et références",
          content:
            "Vérifiez que les projets présentés sont bien réels. N'hésitez pas à visiter les sites web mentionnés ou à demander des références clients. Un freelance sérieux sera transparent sur ses réalisations.",
        },
      ],
      conclusion:
        "Un portfolio révèle beaucoup sur la personnalité professionnelle du freelance. Prenez le temps de l'analyser en détail, c'est votre meilleur indicateur de compatibilité !",
    },
  },
  {
    id: "3",
    title: "Communiquez clairement",
    description: "Une bonne communication évite 80% des problèmes",
    icon: "chatbubbles",
    image: require("../../assets/images/teamwork conversation.jpeg"),
    content: {
      intro:
        "La communication est le pilier de toute collaboration réussie. Établir dès le départ des règles claires et des canaux de communication efficaces vous évitera bien des désagréments et garantira la réussite de votre projet.",
      sections: [
        {
          title: "🎯 Définir le cadre",
          content:
            "Établissez dès le début les modalités de communication : fréquence des points, canaux préférés (email, Slack, téléphone), horaires de disponibilité. Un cadre clair rassure le freelance et structure la collaboration.",
        },
        {
          title: "📋 Points de validation",
          content:
            "Définissez des étapes de validation claires avec des critères précis. Organisez des revues régulières pour éviter les dérives et corriger le tir rapidement. La validation progressive évite les mauvaises surprises à la fin.",
        },
        {
          title: "📝 Documentation partagée",
          content:
            "Maintenez une documentation projet accessible aux deux parties : brief initial, modifications, décisions prises, planning. Cela évite les malentendus et sert de référence en cas de désaccord.",
        },
        {
          title: "🤝 Feedback constructif",
          content:
            "Donnez des retours précis et constructifs. Au lieu de dire 'je n'aime pas', expliquez pourquoi et proposez des alternatives. Un feedback de qualité aide le freelance à s'améliorer et à mieux répondre à vos attentes.",
        },
      ],
      conclusion:
        "La communication n'est pas un coût, c'est un investissement dans la qualité de votre projet. Plus elle est fluide, plus la collaboration sera efficace et agréable pour tous !",
    },
  },
];

export default function HomeScreen() {
  const { profile, user } = useAuth();
  const [selectedTip, setSelectedTip] = useState<TipCard | null>(null);

  // Vérifier si le profil est incomplet
  const isProfileIncomplete = !profile?.full_name || !profile?.role;

  // Obtenir les conseils selon le rôle
  const getTips = () => {
    return profile?.role === "freelance" ? freelanceTips : clientTips;
  };

  const getWelcomeMessage = () => {
    const name =
      profile?.full_name || user?.email?.split("@")[0] || "Utilisateur";
    const role = profile?.role;

    if (role === "freelance") {
      return `Salut ${name} 👋\nTes outils pour trouver une mission`;
    } else if (role === "client") {
      return `Bonjour ${name} 👋\nTrouvez le freelance parfait`;
    }
    return `Bienvenue ${name} 👋\nDécouvrez BeeBuddy`;
  };

  const renderTipCard = ({ item }: { item: TipCard }) => (
    <TouchableOpacity
      style={styles.tipCard}
      onPress={() => setSelectedTip(item)}
    >
      <View style={styles.tipHeader}>
        <Ionicons name={item.icon as any} size={24} color="#ebff56" />
        <Text style={styles.tipTitle}>{item.title}</Text>
      </View>
      <Text style={styles.tipDescription}>{item.description}</Text>
      <View style={styles.readMoreContainer}>
        <Text style={styles.readMoreText}>Lire plus</Text>
        <Ionicons name="chevron-forward" size={16} color="#ebff56" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2A2A2A", "#1E1E1E", "#2A2A2A"]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header avec logo */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.appName}>BeeBuddy</Text>
            </View>

            {/* Message de bienvenue personnalisé */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>{getWelcomeMessage()}</Text>
            </View>
          </View>

          {/* Alerte profil incomplet */}
          {isProfileIncomplete && (
            <ProfileIncompleteAlert visible={isProfileIncomplete} />
          )}

          {/* Section Astuces */}
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>
              💡 Astuces{" "}
              {profile?.role === "freelance" ? "Freelance" : "Client"}
            </Text>
            <Text style={styles.sectionSubtitle}>
              Conseils pour maximiser vos chances de succès
            </Text>

            <FlatList
              data={getTips()}
              renderItem={renderTipCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tipsContainer}
              snapToInterval={width * 0.8 + 16}
              decelerationRate="fast"
            />
          </View>

          {/* Espace en bas pour la navigation */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Modal pour afficher le contenu complet de l'astuce */}
        <Modal
          visible={!!selectedTip}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedTip(null)}
        >
          {selectedTip && (
            <SafeAreaView style={styles.modalContainer}>
              <ScrollView
                style={styles.modalScrollView}
                showsVerticalScrollIndicator={false}
              >
                {/* Header avec bouton fermer */}
                <View style={styles.modalHeaderSection}>
                  <TouchableOpacity
                    style={styles.modalCloseBtn}
                    onPress={() => setSelectedTip(null)}
                  >
                    <Ionicons name="close" size={24} color="#FFFFFF" />
                  </TouchableOpacity>

                  <View style={styles.modalTitleSection}>
                    <Text style={styles.modalMainTitle}>
                      {selectedTip.title}
                    </Text>
                  </View>
                </View>

                {/* Image d'en-tête */}
                <View style={styles.modalImageContainer}>
                  <Image
                    source={selectedTip.image}
                    style={styles.modalHeaderImage}
                    resizeMode="cover"
                  />
                </View>

                {/* Contenu de l'article */}
                <View style={styles.modalArticleContent}>
                  {/* Introduction */}
                  <Text style={styles.modalIntroduction}>
                    {selectedTip.content.intro}
                  </Text>

                  {/* Sections */}
                  {selectedTip.content.sections.map((section, index) => (
                    <View key={index} style={styles.modalArticleSection}>
                      <Text style={styles.modalSectionHeader}>
                        {section.title}
                      </Text>
                      <Text style={styles.modalSectionText}>
                        {section.content}
                      </Text>
                    </View>
                  ))}

                  {/* Conclusion */}
                  <View style={styles.modalConclusionSection}>
                    <Text style={styles.modalConclusionTitle}>
                      💡 À retenir
                    </Text>
                    <Text style={styles.modalConclusionContent}>
                      {selectedTip.content.conclusion}
                    </Text>
                  </View>

                  {/* Espace en bas */}
                  <View style={styles.modalBottomSpacing} />
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2A2A",
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  appName: {
    color: "#ebff56",
    fontSize: 28,
    fontWeight: "bold",
  },
  welcomeContainer: {
    marginTop: 8,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  tipsSection: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    marginBottom: 20,
  },
  tipsContainer: {
    paddingRight: 24,
  },
  tipCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    flex: 1,
  },
  tipDescription: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  readMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  readMoreText: {
    color: "#ebff56",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  bottomSpacing: {
    height: 100,
  },
  // Modal styles (pageSheet style)
  modalContainer: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  modalScrollView: {
    flex: 1,
  },
  modalHeaderSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  modalCloseBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitleSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  modalMainTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalImageContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalHeaderImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
  },
  modalArticleContent: {
    paddingHorizontal: 20,
  },
  modalIntroduction: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 28,
    fontStyle: "italic",
    textAlign: "justify",
  },
  modalArticleSection: {
    marginBottom: 24,
  },
  modalSectionHeader: {
    color: "#ebff56",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalSectionText: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
  modalConclusionSection: {
    backgroundColor: "rgba(235, 255, 86, 0.1)",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#ebff56",
  },
  modalConclusionTitle: {
    color: "#ebff56",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalConclusionContent: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    textAlign: "justify",
  },
  modalBottomSpacing: {
    height: 40,
  },
});
