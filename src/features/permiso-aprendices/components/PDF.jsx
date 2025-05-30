import { Document, Text, Page, StyleSheet, View, Image } from "@react-pdf/renderer";
import logosenatilogo from "../../../shared/utils/senatilogo.png";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50'
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
    borderBottom: '1px solid #eee',
    paddingBottom: 3
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    width: '30%',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#34495e'
  },
  value: {
    width: '70%',
    fontSize: 12,
    color: '#2c3e50'
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center'
  },
  logo: {
    width: 100,
    height: 80,
    position: 'absolute',
    bottom: 20,
    right: 25,
  },
  divider: {
    borderBottom: '1px solid #bdc3c7',
    marginVertical: 15
  },
  signatureLine: {
    borderTop: '1px solid #000',
    width: '100%',
    marginBottom: 5
  },
  signatureText: {
    fontSize: 10,
    textAlign: 'center'
  },
  centeredSignature: {
    marginTop: 40,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center'
  },
});

export const PDF = ({ data }) => {
  const formData = {
    id: data?.id || "00321",
    fecha: data?.fechaCreacion || "15/05/2023",
    nombres: data?.nombres || "Carlos Alberto",
    apellidos: data?.apellidos || "Ramírez Díaz",
    grupo: data?.grupo || "ADSO-401",
    programa: data?.programa || "Análisis y desarrollo de software",
    motivo: data?.motivo || "Asunto personal",
    horaSalida: data?.hora_salida || "09:30",
    horaRetorno: data?.hora_retorno || "11:00",
    tiempoPermiso: data?.tiempo_permiso || "02:30",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Image src={logosenatilogo} style={styles.logo} />
          <Text style={styles.title}>REGISTRO DE PERMISO DE APRENDIZ</Text>
          <Text style={styles.subtitle}>Instituto SENATI</Text>
        </View>

        {/* Datos generales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Permiso</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Número de Registro:</Text>
            <Text style={styles.value}>{formData.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{formData.fecha}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Información del aprendiz */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Aprendiz</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombres:</Text>
            <Text style={styles.value}>{formData.nombres}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Apellidos:</Text>
            <Text style={styles.value}>{formData.apellidos}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Grupo:</Text>
            <Text style={styles.value}>{formData.grupo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Programa:</Text>
            <Text style={styles.value}>{formData.programa}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Detalles del permiso */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles del Permiso</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Motivo:</Text>
            <Text style={styles.value}>{formData.motivo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hora de salida:</Text>
            <Text style={styles.value}>{formData.horaSalida}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hora de retorno:</Text>
            <Text style={styles.value}>{formData.horaRetorno}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tiempo total:</Text>
            <Text style={styles.value}>{formData.tiempoPermiso}</Text>
          </View>
        </View>
        
		{/* Sección de firmas */}
		<View style={styles.divider} />
        
        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Firma del solicitante */}
          <View style={{ width: '30%', alignItems: 'center' }}>
            <View style={{ borderTop: '1px solid #000', width: '100%', marginBottom: 5 }} />
            <Text style={{ fontSize: 10 }}>Firma del Aprendiz</Text>
          </View>
          
          {/* Firma del instructor */}
          <View style={{ width: '30%', alignItems: 'center' }}>
            <View style={{ borderTop: '1px solid #000', width: '100%', marginBottom: 5 }} />
            <Text style={{ fontSize: 10 }}>Firma del Instructor</Text>
          </View>
        </View>
        
        {/* Pie de página */}
        <View style={styles.footer}>
          <Text>Documento generado automáticamente - Sistema de Gestión de Permisos</Text>
          <Text>© {new Date().getFullYear()} Instituto SENATI. Todos los derechos reservados.</Text>
        </View>
      </Page>
    </Document>
       
  );
};
