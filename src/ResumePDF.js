import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  headerText: {
    flexDirection: "column",
  },
});

function ResumePDF({ data }) {
  const {
    name,
    email,
    logo,
    experience = [],
    education = [],
    skills = [],
  } = data;

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            {logo && <Image style={styles.logo} src={logo} />}
            <View style={styles.headerText}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
          </View>
        </View>

        {/* ...rest of the component stays the same... */}
      </Page>
    </Document>
  );
}

export default ResumePDF;
