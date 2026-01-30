import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

type Client = {
  _id: string;
  name: string;
  email: string;
  pan?: string;
  gstin?: string;
  address?: string;
};

type FileType = {
  _id: string;
  fileName: string;
  financialYear: string;
  fileType: string;
  user: Client;
};

const DOCUMENT_TYPES = [
  "Audited Financial Statement",
  "Certified Statement",
  "Project Report",
  "Balance Sheet P & L",
];

export default function AdminDashboard() {
  const { logout } = useAuth();

  const { token } = useAuth();

  const [clients, setClients] = useState<Client[]>([]);
  const [files, setFiles] = useState<FileType[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingFiles, setLoadingFiles] = useState(true);

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    password: "",
    pan: "",
    gstin: "",
    address: "",
  });

  const [activeTab, setActiveTab] = useState<
    "clients" | "files" | "upload" | "create"
  >("clients");

  // 🔹 Upload states
  const [uploadFile, setUploadFile] = useState<any>(null);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [financialYear, setFinancialYear] = useState("");
  const [fileType, setFileType] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);

  // 🔹 Edit client
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  const handleLogout = async () => {
    try {
      await logout(); // Auth context ka logout
      router.replace("/login"); // redirect to login
    } catch (err) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  // 🔹 Fetch clients
  const fetchClients = async () => {
    setLoadingClients(true);
    try {
      const res = await fetch(
        "https://zback-csw5.onrender.com/api/admin/clients",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const json = await res.json();
      if (json.success) setClients(json.data);
    } catch {
      Alert.alert("Error", "Failed to load clients");
    } finally {
      setLoadingClients(false);
    }
  };

  // 🔹 Fetch files
  const fetchFiles = async () => {
    setLoadingFiles(true);
    try {
      const res = await fetch(
        "https://zback-csw5.onrender.com/api/admin/all-files",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const json = await res.json();
      if (json.success) setFiles(json.data);
    } catch {
      Alert.alert("Error", "Failed to load files");
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchFiles();
  }, []);

  // 🔹 Pick file
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
    });
    if (!result.canceled) setUploadFile(result.assets[0]);
  };

  // 🔹 Upload file
  const handleUpload = async () => {
    if (!selectedClientId || !uploadFile || !financialYear || !fileType) {
      Alert.alert("Error", "Fill all upload fields");
      return;
    }

    try {
      setLoadingUpload(true);
      const formData = new FormData();
      formData.append("userId", selectedClientId);
      formData.append("file", {
        uri: uploadFile.uri,
        name: uploadFile.name,
        type: uploadFile.mimeType || "application/octet-stream",
      } as any);
      formData.append("financialYear", financialYear);
      formData.append("fileType", fileType);

      const res = await fetch(
        "https://zback-csw5.onrender.com/api/files/upload",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      Alert.alert("Success", "File uploaded successfully");
      setUploadFile(null);
      setSelectedClientId("");
      setFinancialYear("");
      setFileType("");
      fetchFiles();
    } catch (err: any) {
      Alert.alert("Upload Failed", err.message || "Something went wrong");
    } finally {
      setLoadingUpload(false);
    }
  };

  // create client
  const handleCreateClient = async () => {
    if (!newClient.name || !newClient.email || !newClient.password) {
      Alert.alert("Error", "Name, Email, Password required");
      return;
    }

    try {
      const res = await fetch(
        "https://zback-csw5.onrender.com/api/admin/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newClient),
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      Alert.alert("Success", "Client created");
      setNewClient({
        name: "",
        email: "",
        password: "",
        pan: "",
        gstin: "",
        address: "",
      });
      fetchClients();
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to create client");
    }
  };

  // 🔹 Delete client
  const deleteClient = async (id: string) => {
    try {
      await fetch(`https://zback-csw5.onrender.com/api/admin/client/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClients();
      Alert.alert("Deleted", "Client removed successfully");
    } catch {
      Alert.alert("Error", "Failed to delete client");
    }
  };

  // 🔹 Delete file
  const deleteFile = async (id: string) => {
    try {
      await fetch(`https://zback-csw5.onrender.com/api/admin/file/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFiles();
      Alert.alert("Deleted", "File removed successfully");
    } catch {
      Alert.alert("Error", "Failed to delete file");
    }
  };

  // 🔹 Edit client save
  const saveEditClient = async () => {
    if (!editClient) return;
    try {
      const res = await fetch(
        `https://zback-csw5.onrender.com/api/admin/client/${editClient._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      Alert.alert("Updated", "Client updated successfully");
      setEditClient(null);
      fetchClients();
    } catch (err: any) {
      Alert.alert("Error", err.message || "Update failed");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Text style={styles.header}>Admin Dashboard</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      {/* 🔹 Tabs */}
      <View style={styles.tabs}>
        {["clients", "files", "upload", "create"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab ? styles.activeTab : {}]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text
              style={
                activeTab === tab ? { color: "#fff" } : { color: "#0284c7" }
              }
            >
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔹 Clients Tab */}
      {activeTab === "clients" && (
        <View>
          {loadingClients ? (
            <ActivityIndicator />
          ) : clients.length === 0 ? (
            <Text>No clients found</Text>
          ) : (
            clients.map((c) => (
              <View key={c._id} style={styles.card}>
                <Text style={styles.clientName}>{c.name}</Text>

                <Text style={styles.clientEmail}>{c.email}</Text>

                <View style={styles.infoBlock}>
                  {c.pan && (
                    <Text style={styles.infoText}>
                      <Text style={styles.label}>PAN:</Text> {c.pan}
                    </Text>
                  )}

                  {c.gstin && (
                    <Text style={styles.infoText}>
                      <Text style={styles.label}>GST No:</Text> {c.gstin}
                    </Text>
                  )}

                  {c.address && (
                    <Text style={styles.infoText}>
                      <Text style={styles.label}>Address:</Text> {c.address}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setEditClient(c);
                      setEditForm({ name: c.name, email: c.email });
                    }}
                    style={styles.actionBtn}
                  >
                    <Text style={{ color: "#0284c7" }}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteClient(c._id)}
                    style={styles.actionBtn}
                  >
                    <Text style={{ color: "red" }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* 🔹 Files Tab */}
      {activeTab === "files" && (
        <View>
          {loadingFiles ? (
            <ActivityIndicator />
          ) : files.length === 0 ? (
            <Text>No files found</Text>
          ) : (
            files.map((f) => (
              <View key={f._id} style={styles.card}>
                <Text style={styles.cardHeader}>{f.fileName}</Text>
                <Text>Type: {f.fileType}</Text>
                <Text>Client: {f.user.name}</Text>
                <Text>Email: {f.user.email}</Text>
                <Text>Financial Year: {f.financialYear}</Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => Alert.alert("View", f.fileName)}
                    style={styles.actionBtn}
                  >
                    <Text style={{ color: "#0284c7" }}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteFile(f._id)}
                    style={styles.actionBtn}
                  >
                    <Text style={{ color: "red" }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* 🔹 Upload Tab */}
      {activeTab === "upload" && (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Upload File</Text>

          {/* Financial Year */}
          <Text style={{ marginBottom: 6 }}>Financial Year</Text>
          <TextInput
            placeholder="Enter Financial Year"
            placeholderTextColor="#050505"
            style={styles.input}
            value={financialYear}
            onChangeText={setFinancialYear}
          />

          {/* Client Selection */}
          <Text style={{ marginBottom: 6 }}>Select Client</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10 }}
          >
            {clients.map((c) => (
              <TouchableOpacity
                key={c._id}
                onPress={() => setSelectedClientId(c._id)}
                style={[
                  styles.docTypeBtn,
                  selectedClientId === c._id ? styles.selectedDocType : {},
                  { marginRight: 8 },
                ]}
              >
                <Text
                  style={
                    selectedClientId === c._id
                      ? { color: "#fff" }
                      : { color: "#0284c7" }
                  }
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Document Type */}
          <Text style={{ marginBottom: 6 }}>Document Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10 }}
          >
            {DOCUMENT_TYPES.map((dt) => (
              <TouchableOpacity
                key={dt}
                onPress={() => setFileType(dt)}
                style={[
                  styles.docTypeBtn,
                  fileType === dt ? styles.selectedDocType : {},
                  { marginRight: 8 },
                ]}
              >
                <Text
                  style={
                    fileType === dt ? { color: "#fff" } : { color: "#0284c7" }
                  }
                >
                  {dt}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* File Picker */}
          <TouchableOpacity style={styles.fileBtn} onPress={pickFile}>
            <Text>{uploadFile ? uploadFile.name : "Choose File"}</Text>
          </TouchableOpacity>

          {/* Upload Button */}
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={handleUpload}
            disabled={loadingUpload}
          >
            {loadingUpload ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff" }}>Upload</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* 🔹 Create Client Tab */}
      {activeTab === "create" && (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Create Client</Text>

          {["name", "email", "password", "pan", "gstin", "address"].map(
            (field) => (
              <TextInput
                key={field}
                placeholder={field.toUpperCase()}
                placeholderTextColor="#000000"
                style={styles.input}
                value={(newClient as any)[field]}
                onChangeText={(text) =>
                  setNewClient({ ...newClient, [field]: text })
                }
              />
            ),
          )}

          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={handleCreateClient}
          >
            <Text style={{ color: "#fff" }}>Create Client</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 🔹 Edit Client Modal */}
      <Modal visible={!!editClient} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.cardHeader}>Edit Client</Text>
            {["name", "email"].map((field) => (
              <TextInput
                key={field}
                placeholder={field.toUpperCase()}
                style={styles.input}
                value={(editForm as any)[field]}
                onChangeText={(text) =>
                  setEditForm({ ...editForm, [field]: text })
                }
              />
            ))}

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => setEditClient(null)}
                style={styles.cancelBtn}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveEditClient}
                style={styles.uploadBtn}
              >
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  clientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
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

  clientEmail: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 8,
  },

  infoBlock: {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 8,
  },

  label: {
    fontWeight: "600",
    color: "#334155",
  },

  infoText: {
    fontSize: 13,
    color: "#334155",
    marginBottom: 4,
  },

  container: { flex: 1, backgroundColor: "#f3f4f6", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0284c7",
    marginBottom: 16,
    marginTop: 15,
  },
  tabs: { flexDirection: "row", marginBottom: 16, flexWrap: "wrap", gap: 6 },
  tabBtn: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#0284c7",
    borderRadius: 8,
  },
  activeTab: { backgroundColor: "#0284c7" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
    color: "#0284c7",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  fileBtn: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#0284c7",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  uploadBtn: {
    backgroundColor: "#0284c7",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  docTypeBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#0284c7",
    borderRadius: 8,
    marginBottom: 6,
    alignItems: "center",
  },
  selectedDocType: { backgroundColor: "#0284c7" },
  actionBtn: { paddingHorizontal: 6, paddingVertical: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: { backgroundColor: "#fff", borderRadius: 12, padding: 16 },
  cancelBtn: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
});
