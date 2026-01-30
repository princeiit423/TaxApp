import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

const FILE_TYPES = [
  "Audited Financial Statement",
  "Certified Statement",
  "Project Report",
  "Balance Sheet P & L",
];

const API_URL = "https://zback-csw5.onrender.com/api/files/my-files";

export default function UserFilesScreen() {
  const { token } = useAuth();
  const { logout } = useAuth();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState("");

  // ✅ FETCH ONLY ONCE (OR TOKEN CHANGE)
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchFiles();
  }, [token]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setFiles(json.data);
      } else {
        setFiles([]);
      }
    } catch {
      Alert.alert("Error", "Failed to fetch documents.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FRONTEND SEARCH (NO API HIT)
  const yearFilteredFiles = year
    ? files.filter((f) =>
        f.financialYear?.toLowerCase().includes(year.toLowerCase()),
      )
    : files;

  const groupedFiles = FILE_TYPES.map((type) => ({
    type,
    files: yearFilteredFiles.filter((f) => f.fileType === type),
  }));

  // handle logout
  const handleLogout = async () => {
    try {
      await logout(); // Auth context ka logout
      router.replace("/login"); // redirect to login
    } catch (err) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  const handleOpen = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else Alert.alert("Error", "Cannot open file");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  if (!token) {
    return (
      <View style={styles.center}>
        <Text>Please login to see documents</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.header}>Your Documents</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* 🔍 SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search by Financial Year (e.g. 2024-25)"
          value={year}
          onChangeText={setYear}
          style={styles.searchInput}
        />
      </View>

      {yearFilteredFiles.length === 0 ? (
        <Text style={styles.empty}>No documents found</Text>
      ) : (
        groupedFiles.map(
          (group) =>
            group.files.length > 0 && (
              <View key={group.type} style={{ marginBottom: 28 }}>
                <Text style={styles.sectionTitle}>{group.type}</Text>

                {group.files.map((file) => (
                  <View key={file._id} style={styles.card}>
                    <Text style={styles.fileName}>{file.fileName}</Text>
                    <Text style={styles.meta}>
                      Financial Year: {file.financialYear}
                    </Text>
                    <Text style={styles.meta}>
                      Uploaded: {new Date(file.createdAt).toLocaleDateString()}
                    </Text>

                    <View style={styles.actions}>
                      <TouchableOpacity
                        style={styles.viewBtn}
                        onPress={() => handleOpen(file.fileUrl)}
                      >
                        <Text style={styles.btnText}>View</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.downloadBtn}
                        onPress={() => handleOpen(file.fileUrl)}
                      >
                        <Text style={styles.btnText}>Download</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ),
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "#ef4444", // nice red color
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0284c7",
    marginBottom: 13,
    marginTop: 20,
  },
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  searchInput: {
    padding: 10,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0284c7",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 4,
  },
  fileName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  meta: {
    color: "#6b7280",
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    marginTop: 14,
    gap: 10,
  },
  viewBtn: {
    flex: 1,
    backgroundColor: "#0284c7",
    padding: 12,
    borderRadius: 8,
  },
  downloadBtn: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  empty: {
    color: "#6b7280",
    textAlign: "center",
    marginTop: 40,
  },
});
