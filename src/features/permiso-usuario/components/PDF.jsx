import { Document, Text, Page, StyleSheet, View, Image } from "@react-pdf/renderer";
import logosenatilogo from "../../../shared/utils/senatilogo.png"
// Definición de estilos
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
  // Datos de ejemplo (en producción estos vendrían del prop 'data')
  const formData = {
    id: data?.id || "00254",
    fecha: data?.fechaCreacion || "15/05/2023",
    nombre: data?.instructor?.nombre || "María José",
    apellidos: data?.instructor.apellidos || "García López",
    motivo: data?.motivo || "Capacitación profesional",
    detalleMotivo: data?.detalle_motivo || "Asistencia al taller de innovación educativa en la Universidad Nacional",
    dependencia: data?.dependencia || "Departamento de Matemáticas",
    cargo: data?.cargo || "Profesor Titular",
    horaSalida: data?.hora_salida || "08:00",
    horaRegreso: data?.hora_regreso || "14:00"
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado con logo institucional */}
        <View style={styles.header}>
          <Image src={logosenatilogo} style={styles.logo} />
          <Text style={styles.title}>REGISTRO DE PERMISO DOCENTE</Text>
          <Text style={styles.subtitle}>Instituto SENATI</Text>
        </View>

        {/* Sección de información del formulario */}
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

        {/* Sección de información del docente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Docente</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{formData.nombre}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Apellidos:</Text>
            <Text style={styles.value}>{formData.apellidos}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dependencia:</Text>
            <Text style={styles.value}>{formData.dependencia}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cargo:</Text>
            <Text style={styles.value}>{formData.cargo}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Sección de detalles del permiso */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles del Permiso</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Motivo:</Text>
            <Text style={styles.value}>{formData.motivo}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Detalle del motivo:</Text>
            <Text style={[styles.value, { marginTop: 5 }]}>{formData.detalleMotivo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hora de salida:</Text>
            <Text style={styles.value}>{formData.horaSalida}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hora de regreso:</Text>
            <Text style={styles.value}>{formData.horaRegreso}</Text>
          </View>
        </View>

         {/* Sección de firmas */}
        <View style={styles.divider} />
        
        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Firma del solicitante */}
          <View style={{ width: '30%', alignItems: 'center' }}>
            <View style={{ borderTop: '1px solid #000', width: '100%', marginBottom: 5 }} />
            <Text style={{ fontSize: 10 }}>Firma del Docente</Text>
          </View>
          
          {/* Firma del jefe inmediato */}
          <View style={{ width: '30%', alignItems: 'center' }}>
            <View style={{ borderTop: '1px solid #000', width: '100%', marginBottom: 5 }} />
            <Text style={{ fontSize: 10 }}>Firma Jefe Inmediato</Text>
          </View>
          
          {/* Firma del jefe de actividad */}
          <View style={{ width: '30%', alignItems: 'center' }}>
            <View style={{ borderTop: '1px solid #000', width: '100%', marginBottom: 5 }} />
            <Text style={{ fontSize: 10 }}>Firma Jefe de Actividad</Text>
          </View>
        </View>

        {/* Nueva firma centrada para el encargado */}
                  <View style={styles.centeredSignature}>
                    <View style={styles.signatureLine} />
                    <Text style={styles.signatureText}>Firma y nombre del encargado</Text>
                  </View>


        {/* Pie de página */}
        <View style={styles.footer}>
          <Text>Documento generado automáticamente - Sistema de Gestión Docente</Text>
          <Text>© {new Date().getFullYear()}  instituto de educación superior SENATI. Todos los derechos reservados.</Text>
        </View>
      </Page>
    </Document>
  );
};