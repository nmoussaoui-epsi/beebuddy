import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  CVData,
  ProjectData,
  profileService,
} from "../../services/ProfileService";

export default function ProfileScreen() {
  const { profile, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editedProfile, setEditedProfile] = useState({
    full_name: profile?.full_name || "",
    skills: "",
    experience: "",
    expected_salary: "",
  });

  const loadProfileData = useCallback(async () => {
    if (!profile) return;

    setLoading(true);

    // Charger les données CV si c'est un freelance
    if (profile.role === "freelance") {
      const { data: cv } = await profileService.getCV(profile.id);
      setCvData(cv);
      if (cv) {
        setEditedProfile((prev) => ({
          ...prev,
          skills: cv.skills?.join(", ") || "",
          experience: cv.experience || "",
          expected_salary: cv.expected_salary?.toString() || "",
        }));
      }
    }

    // Charger les projets si c'est un client
    if (profile.role === "client") {
      const { data: projects } = await profileService.getClientProjects(
        profile.id
      );
      setProjectsData(projects || []);
    }

    setLoading(false);
  }, [profile]);

  useEffect(() => {
    setEditedProfile((prev) => ({
      ...prev,
      full_name: profile?.full_name || "",
    }));
    loadProfileData();
  }, [profile, loadProfileData]);

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: signOut,
      },
    ]);
  };

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde des modifications
    console.log("Sauvegarde des modifications:", editedProfile);
    setIsEditing(false);
    Alert.alert("Succès", "Profil mis à jour avec succès !");
  };

  const handleCancel = () => {
    setEditedProfile({
      full_name: profile?.full_name || "",
      skills: cvData?.skills?.join(", ") || "",
      experience: cvData?.experience || "",
      expected_salary: cvData?.expected_salary?.toString() || "",
    });
    setIsEditing(false);
  };

  if (!profile || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            {!profile ? "Chargement du profil..." : "Chargement des données..."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header avec avatar */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={() => console.log("Modifier l'avatar")}
            >
              <Ionicons name="camera" size={16} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.profileName}>{profile.full_name}</Text>
            <View style={styles.roleContainer}>
              <Ionicons
                name={profile.role === "freelance" ? "briefcase" : "business"}
                size={18}
                color="#FFD700"
              />
              <Text style={styles.roleText}>
                {profile.role === "freelance" ? "Freelancer" : "Client"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons
              name={isEditing ? "checkmark" : "pencil"}
              size={20}
              color="#FFD700"
            />
          </TouchableOpacity>
        </View>

        {/* Informations de base */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Nom complet</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedProfile.full_name}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, full_name: text })
                }
                placeholder="Votre nom complet"
                placeholderTextColor="#666"
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.full_name}</Text>
            )}
          </View>
        </View>

        {/* Compétences (pour freelances) */}
        {profile.role === "freelance" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compétences</Text>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Mes compétences</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.textInput, styles.multilineInput]}
                  value={editedProfile.skills}
                  onChangeText={(text) =>
                    setEditedProfile({ ...editedProfile, skills: text })
                  }
                  placeholder="React, Node.js, JavaScript..."
                  placeholderTextColor="#666"
                  multiline
                />
              ) : (
                <View style={styles.skillsContainer}>
                  {cvData?.skills && cvData.skills.length > 0 ? (
                    cvData.skills.map((skill: string, index: number) => (
                      <View key={index} style={styles.skillTag}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noDataText}>
                      Aucune compétence renseignée
                    </Text>
                  )}
                </View>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Salaire attendu</Text>
              {isEditing ? (
                <TextInput
                  style={styles.textInput}
                  value={editedProfile.expected_salary}
                  onChangeText={(text) =>
                    setEditedProfile({
                      ...editedProfile,
                      expected_salary: text,
                    })
                  }
                  placeholder="50000"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.fieldValue}>
                  {cvData?.expected_salary
                    ? `${cvData.expected_salary}€`
                    : "Non renseigné"}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Expérience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expérience</Text>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>
              Description de votre expérience
            </Text>
            {isEditing ? (
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                value={editedProfile.experience}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, experience: text })
                }
                placeholder="Décrivez votre expérience professionnelle..."
                placeholderTextColor="#666"
                multiline
              />
            ) : (
              <Text style={styles.fieldValue}>
                {cvData?.experience || "Aucune expérience renseignée"}
              </Text>
            )}
          </View>
        </View>

        {/* Projets (pour clients) */}
        {profile.role === "client" &&
          projectsData &&
          projectsData.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mes projets</Text>
              {projectsData.map((project: ProjectData, index: number) => (
                <View key={index} style={styles.projectCard}>
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
              ))}
            </View>
          )}

        {/* Actions */}
        {isEditing && (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>

        {/* Espacement en bas */}
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFD700",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1A1A1A",
  },
  headerContent: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  roleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFD700",
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  section: {
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#AAAAAA",
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 22,
  },
  textInput: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444444",
    color: "#FFFFFF",
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillTag: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  noDataText: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
  },
  projectCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  projectDescription: {
    fontSize: 14,
    color: "#AAAAAA",
    lineHeight: 18,
    marginBottom: 8,
  },
  projectBudget: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFD700",
  },
  editActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#444444",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#FFD700",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A2A2A",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
  },
  bottomSpacing: {
    height: 20,
  },
});
