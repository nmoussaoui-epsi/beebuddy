import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Politique de Confidentialité</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.text}>
            BeeBuddy s'engage à protéger votre vie privée. Cette politique de
            confidentialité explique comment nous collectons, utilisons et
            protégeons vos informations personnelles lorsque vous utilisez notre
            plateforme de mise en relation entre freelances et clients.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. Données que nous collectons
          </Text>
          <Text style={styles.subTitle}>2.1 Informations de profil</Text>
          <Text style={styles.text}>
            • Nom complet et informations de contact{"\n"}• Photo de profil
            {"\n"}• Compétences et expérience professionnelle{"\n"}• Portfolio
            et réalisations{"\n"}• Tarifs et disponibilités
          </Text>

          <Text style={styles.subTitle}>2.2 Données d'utilisation</Text>
          <Text style={styles.text}>
            • Historique des connexions{"\n"}• Interactions avec d'autres
            utilisateurs{"\n"}• Messages échangés{"\n"}• Préférences de
            recherche{"\n"}• Données de géolocalisation (avec votre
            consentement)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Utilisation de vos données</Text>
          <Text style={styles.text}>
            Nous utilisons vos données pour :{"\n"}• Faciliter les mises en
            relation{"\n"}• Améliorer nos services{"\n"}• Assurer la sécurité de
            la plateforme{"\n"}• Vous envoyer des notifications importantes
            {"\n"}• Analyser l'utilisation de l'application
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Partage des données</Text>
          <Text style={styles.text}>
            Nous ne vendons jamais vos données personnelles. Nous pouvons
            partager certaines informations :{"\n"}• Avec d'autres utilisateurs
            (profil public){"\n"}• Avec nos partenaires techniques (hébergement
            sécurisé){"\n"}• Si requis par la loi{"\n"}• En cas de fusion ou
            acquisition (avec notification préalable)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Vos droits RGPD</Text>
          <Text style={styles.text}>
            Conformément au RGPD, vous avez le droit de :{"\n"}• Accéder à vos
            données personnelles{"\n"}• Rectifier des informations inexactes
            {"\n"}• Supprimer votre compte et vos données{"\n"}• Limiter le
            traitement de vos données{"\n"}• Portabilité de vos données{"\n"}•
            Vous opposer au traitement{"\n"}• Retirer votre consentement à tout
            moment
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Sécurité des données</Text>
          <Text style={styles.text}>
            Nous mettons en place des mesures de sécurité appropriées :{"\n"}•
            Chiffrement des données sensibles{"\n"}• Accès restreint aux données
            {"\n"}• Surveillance continue des systèmes{"\n"}• Sauvegrades
            régulières{"\n"}• Formation de notre équipe sur la sécurité
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Conservation des données</Text>
          <Text style={styles.text}>
            Nous conservons vos données tant que votre compte est actif. Après
            suppression de votre compte, certaines données peuvent être
            conservées pendant 3 ans maximum pour des raisons légales ou de
            sécurité.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Contact</Text>
          <Text style={styles.text}>
            Pour toute question concernant cette politique de confidentialité ou
            l'exercice de vos droits, contactez-nous :{"\n"}
            Email : privacy@beebuddy.fr{"\n"}
            Adresse : 123 Avenue des Freelances, 75001 Paris, France
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lastUpdated: {
    color: "#A0A0A0",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 20,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#ebff56",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },
  text: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "justify",
  },
  bottomSpacing: {
    height: 40,
  },
});
