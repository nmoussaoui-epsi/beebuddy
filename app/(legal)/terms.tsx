import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function TermsOfService() {
  const navigateBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ebff56" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Conditions d'Utilisation</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.lastUpdated}>
          Dernière mise à jour : 15 janvier 2025
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>1. Acceptation des Conditions</ThemedText>
        <ThemedText style={styles.paragraph}>
          En utilisant l'application BeeBuddy, vous acceptez d'être lié par ces conditions d'utilisation. 
          Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>2. Description du Service</ThemedText>
        <ThemedText style={styles.paragraph}>
          BeeBuddy est une plateforme de mise en relation entre freelances et clients pour des projets 
          professionnels. Nous facilitons les connexions et la communication, mais nous ne sommes pas 
          partie prenante dans les accords commerciaux conclus entre les utilisateurs.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>3. Comptes Utilisateurs</ThemedText>
        <ThemedText style={styles.paragraph}>
          Pour utiliser BeeBuddy, vous devez créer un compte avec des informations exactes et complètes. 
          Vous êtes responsable de maintenir la confidentialité de vos identifiants et de toutes les 
          activités sur votre compte.
        </ThemedText>
        <ThemedText style={styles.subParagraph}>
          • Vous devez avoir au moins 18 ans pour utiliser notre service{'\n'}
          • Un seul compte par personne est autorisé{'\n'}
          • Les informations de profil doivent être véridiques et professionnelles
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>4. Utilisation Acceptable</ThemedText>
        <ThemedText style={styles.paragraph}>
          Vous vous engagez à utiliser BeeBuddy de manière responsable et légale. Il est strictement interdit de :
        </ThemedText>
        <ThemedText style={styles.subParagraph}>
          • Publier du contenu offensant, frauduleux ou illégal{'\n'}
          • Harceler, intimider ou menacer d'autres utilisateurs{'\n'}
          • Utiliser le service à des fins non professionnelles{'\n'}
          • Tenter de contourner nos mesures de sécurité{'\n'}
          • Créer de faux profils ou usurper l'identité d'autrui
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>5. Propriété Intellectuelle</ThemedText>
        <ThemedText style={styles.paragraph}>
          BeeBuddy et ses éléments (logo, design, code, contenu) sont protégés par les droits de propriété 
          intellectuelle. Vous conservez les droits sur le contenu que vous publiez, mais vous accordez à 
          BeeBuddy une licence pour l'utiliser dans le cadre du service.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>6. Transactions et Paiements</ThemedText>
        <ThemedText style={styles.paragraph}>
          BeeBuddy facilite la mise en relation mais n'intervient pas directement dans les transactions 
          financières entre utilisateurs. Les accords de prix, délais et modalités de paiement sont 
          conclus directement entre les parties.
        </ThemedText>
        <ThemedText style={styles.subParagraph}>
          • Nous ne sommes pas responsables des litiges commerciaux{'\n'}
          • Les utilisateurs doivent respecter leurs engagements contractuels{'\n'}
          • Nous nous réservons le droit de suspendre les comptes en cas de plaintes répétées
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>7. Modération et Sanctions</ThemedText>
        <ThemedText style={styles.paragraph}>
          Nous nous réservons le droit de modérer le contenu et de prendre des mesures contre les comptes 
          qui violent nos conditions :
        </ThemedText>
        <ThemedText style={styles.subParagraph}>
          • Avertissement pour les infractions mineures{'\n'}
          • Suspension temporaire pour les violations répétées{'\n'}
          • Suppression définitive pour les violations graves{'\n'}
          • Signalement aux autorités si nécessaire
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>8. Limitation de Responsabilité</ThemedText>
        <ThemedText style={styles.paragraph}>
          BeeBuddy est fourni "en l'état" sans garantie. Nous ne sommes pas responsables des dommages 
          directs ou indirects résultant de l'utilisation du service, notamment :
        </ThemedText>
        <ThemedText style={styles.subParagraph}>
          • Perte de données ou interruption de service{'\n'}
          • Problèmes techniques ou bugs{'\n'}
          • Actions d'autres utilisateurs{'\n'}
          • Litiges commerciaux entre utilisateurs
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>9. Protection des Données</ThemedText>
        <ThemedText style={styles.paragraph}>
          Le traitement de vos données personnelles est régi par notre Politique de Confidentialité, 
          qui fait partie intégrante de ces conditions. Nous nous engageons à respecter le RGPD et 
          à protéger votre vie privée.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>10. Modifications des Conditions</ThemedText>
        <ThemedText style={styles.paragraph}>
          Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront 
          informés des changements importants par notification dans l'application ou par email. 
          L'utilisation continue du service après modification vaut acceptation des nouvelles conditions.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>11. Résiliation</ThemedText>
        <ThemedText style={styles.paragraph}>
          Vous pouvez supprimer votre compte à tout moment depuis votre profil. Nous pouvons également 
          suspendre ou supprimer votre compte en cas de violation des conditions d'utilisation.
        </ThemedText>
        <ThemedText style={styles.subParagraph}>
          • La suppression est définitive et irréversible{'\n'}
          • Vos données seront supprimées conformément au RGPD{'\n'}
          • Les conversations et projets en cours peuvent être affectés
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>12. Droit Applicable</ThemedText>
        <ThemedText style={styles.paragraph}>
          Ces conditions d'utilisation sont régies par le droit français. Tout litige sera soumis 
          à la juridiction des tribunaux français compétents.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>13. Contact</ThemedText>
        <ThemedText style={styles.paragraph}>
          Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter :
        </ThemedText>
        <ThemedText style={styles.contactInfo}>
          • Email : legal@beebuddy.app{'\n'}
          • Adresse : BeeBuddy SAS, 123 Avenue des Champs-Élysées, 75008 Paris{'\n'}
          • Téléphone : +33 1 23 45 67 89
        </ThemedText>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            En utilisant BeeBuddy, vous reconnaissez avoir lu, compris et accepté ces conditions d'utilisation.
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ebff56',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#ddd',
    marginBottom: 16,
  },
  subParagraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#bbb',
    marginBottom: 16,
    marginLeft: 16,
  },
  contactInfo: {
    fontSize: 15,
    lineHeight: 22,
    color: '#ebff56',
    marginBottom: 16,
    marginLeft: 16,
  },
  footer: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    marginVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
