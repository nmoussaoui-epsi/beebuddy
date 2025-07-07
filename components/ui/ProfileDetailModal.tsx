import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { UserProfile } from "../../types/search";

interface ProfileDetailModalProps {
  visible: boolean;
  onClose: () => void;
  profile: UserProfile | null;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  visible,
  onClose,
  profile,
}) => {
  const [activeTab, setActiveTab] = useState<
    "responsibilities" | "experience" | "education"
  >("responsibilities");

  if (!profile) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header avec avatar */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: profile.avatar_url }}
                style={styles.avatar}
              />
              <View style={styles.statusIndicator} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{profile.full_name}</Text>
              <Text style={styles.jobTitle}>
                {profile.role === "freelance" ? "Freelancer" : "Client"}
              </Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Badges d'informations */}
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Ionicons name="location-outline" size={16} color="#FFF" />
              <Text style={styles.badgeText}>Paris, France</Text>
            </View>
            {profile.role === "freelance" && (
              <View style={styles.badge}>
                <Ionicons name="time-outline" size={16} color="#FFF" />
                <Text style={styles.badgeText}>Expérimenté</Text>
              </View>
            )}
            <View style={styles.badge}>
              <Ionicons name="briefcase-outline" size={16} color="#FFF" />
              <Text style={styles.badgeText}>
                {profile.role === "freelance" ? "Freelance" : "Projets"}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {profile.cv?.experience ||
                (profile.role === "freelance"
                  ? "Freelancer passionné prêt à collaborer sur vos projets !"
                  : "À la recherche de talents pour mes projets innovants.")}
            </Text>
            {profile.cv?.skills && profile.cv.skills.length > 0 && (
              <Text style={styles.descriptionSecondary}>
                Compétences: {profile.cv.skills.join(", ")}
              </Text>
            )}
          </View>

          {/* Sections avec onglets */}
          <View style={styles.tabsContainer}>
            <View style={styles.tabsRow}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "responsibilities" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("responsibilities")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "responsibilities" && styles.activeTabText,
                  ]}
                >
                  {profile.role === "freelance" ? "Compétences" : "Projets"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "experience" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("experience")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "experience" && styles.activeTabText,
                  ]}
                >
                  Expérience
                </Text>
              </TouchableOpacity>
              {profile.role === "freelance" && (
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "education" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("education")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "education" && styles.activeTabText,
                    ]}
                  >
                    Infos
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Contenu des onglets */}
          {activeTab === "responsibilities" && (
            <View style={styles.contentContainer}>
              {profile.role === "freelance" ? (
                // Affichage des compétences pour les freelances
                profile.cv?.skills && profile.cv.skills.length > 0 ? (
                  <View style={styles.skillsContainer}>
                    {profile.cv.skills.map((skill, index) => (
                      <View key={index} style={styles.skillItem}>
                        <View style={styles.skillNumber}>
                          <Text style={styles.skillNumberText}>
                            {index + 1}
                          </Text>
                        </View>
                        <View style={styles.skillContent}>
                          <Text style={styles.skillText}>{skill}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noDataText}>
                    Aucune compétence renseignée
                  </Text>
                )
              ) : // Affichage des projets pour les clients
              profile.projects && profile.projects.length > 0 ? (
                <View style={styles.projectsContainer}>
                  {profile.projects.map((project, index) => (
                    <View key={index} style={styles.projectItem}>
                      <View style={styles.projectNumber}>
                        <Text style={styles.projectNumberText}>
                          {index + 1}
                        </Text>
                      </View>
                      <View style={styles.projectContent}>
                        <Text style={styles.projectTitle}>{project.title}</Text>
                        {project.description && (
                          <Text style={styles.projectDescription}>
                            {project.description}
                          </Text>
                        )}
                        {project.budget && (
                          <Text style={styles.projectBudget}>
                            Budget: {project.budget}€
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.noDataText}>Aucun projet renseigné</Text>
              )}
            </View>
          )}

          {activeTab === "experience" && (
            <View style={styles.contentContainer}>
              <Text style={styles.experienceText}>
                {profile.cv?.experience ||
                  "Aucune expérience renseignée pour le moment."}
              </Text>
            </View>
          )}

          {activeTab === "education" && profile.role === "freelance" && (
            <View style={styles.contentContainer}>
              {profile.cv?.expected_salary ? (
                <View style={styles.infoItem}>
                  <Ionicons name="cash-outline" size={20} color="#C8E6C9" />
                  <Text style={styles.infoText}>
                    Salaire attendu: {profile.cv.expected_salary}€
                  </Text>
                </View>
              ) : (
                <Text style={styles.noDataText}>
                  Aucune information supplémentaire
                </Text>
              )}
            </View>
          )}

          {/* Espacement en bas */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2C2C",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#2C2C2C",
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 16,
    color: "#A0A0A0",
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3A3A3A",
    justifyContent: "center",
    alignItems: "center",
  },
  badgesContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
    flexWrap: "wrap",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A3A3A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 24,
    marginBottom: 12,
  },
  descriptionSecondary: {
    fontSize: 14,
    color: "#A0A0A0",
    lineHeight: 20,
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tabsRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3A",
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#C8E6C9",
  },
  tabText: {
    fontSize: 14,
    color: "#A0A0A0",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#C8E6C9",
  },
  contentContainer: {
    gap: 20,
    marginBottom: 20,
  },
  skillsContainer: {
    gap: 16,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  skillNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3A3A3A",
    justifyContent: "center",
    alignItems: "center",
  },
  skillNumberText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  skillContent: {
    flex: 1,
    paddingTop: 4,
  },
  skillText: {
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 20,
  },
  projectsContainer: {
    gap: 20,
  },
  projectItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  projectNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3A3A3A",
    justifyContent: "center",
    alignItems: "center",
  },
  projectNumberText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  projectContent: {
    flex: 1,
    paddingTop: 4,
  },
  projectTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 14,
    color: "#A0A0A0",
    lineHeight: 18,
    marginBottom: 6,
  },
  projectBudget: {
    fontSize: 14,
    color: "#C8E6C9",
    fontWeight: "500",
  },
  experienceText: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  noDataText: {
    fontSize: 14,
    color: "#A0A0A0",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});
