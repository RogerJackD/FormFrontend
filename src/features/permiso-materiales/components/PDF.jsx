import { Document, Text, Page, StyleSheet, View, Image } from "@react-pdf/renderer";
import logosenatilogo from "../../../shared/utils/senatilogo.png";

// Estilos PDF (mantenemos los mismos estilos)
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
  signatureBlock: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureContainer: {
    width: '45%',
    alignItems: 'center'
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
  // Función para formatear nombres completos de objetos
  const formatName = (person) => {
    if (!person) return 'No especificado';
    if (typeof person === 'string') return person;
    if (person.nombres && person.apellidos) return `${person.nombres} ${person.apellidos}`;
    if (person.nombre && person.apellidos) return `${person.nombre} ${person.apellidos}`;
    return 'Nombre no disponible';
  };

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    try {
      // Para fechas en formato "22/05/2025 18:29:01"
      if (dateString.includes('/')) {
        return dateString.split(' ')[0]; // Solo la parte de la fecha
      }
      // Para fechas ISO
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Datos formateados
  const formData = {
    id: data?.id || "Sin ID",
    fecha: formatDate(data?.fechaCreacion),
    nombreAprendiz: data?.nombre_aprendiz || "Aprendiz no especificado",
    accion: data?.accion || "Acción no especificada",
    detalleAccion: data?.detalle_accion || "Sin detalles",
    nombreSeñor: formatName(data?.nombre_señor || data?.encargado),
    instructor: formatName(data?.instructor)
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Image src={logosenatilogo} style={styles.logo} />
          <Text style={styles.title}>REGISTRO DE PERMISO DE MATERIAL</Text>
          <Text style={styles.subtitle}>Instituto SENATI</Text>
        </View>

        {/* Datos del Permiso */}
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

        {/* Información del Aprendiz */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Aprendiz</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{formData.nombreAprendiz}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Instructor Responsable:</Text>
            <Text style={styles.value}>{formData.instructor}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Encargado de entrega:</Text>
            <Text style={styles.value}>{formData.nombreSeñor}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Detalles de la Acción */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de la Acción</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Acción:</Text>
            <Text style={styles.value}>{formData.accion}</Text>
          </View>
          <View>
            <Text style={styles.label}>Detalle de la acción:</Text>
            <Text style={[styles.value, { marginTop: 5 }]}>{formData.detalleAccion}</Text>
          </View>
        </View>

       {/* Firmas */}
          <View style={styles.signatureBlock}>
            <View style={styles.signatureContainer}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Instructor / Aprendiz / Señor</Text>
            </View>
            <View style={styles.signatureContainer}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>V°B° Director / Jefe C.F.P. / U.O.</Text>
            </View>
          </View>

          {/* Nueva firma centrada para el encargado */}
          <View style={styles.centeredSignature}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>Firma y nombre del encargado</Text>
          </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Documento generado automáticamente - Sistema de Gestión de Materiales</Text>
          <Text>© {new Date().getFullYear()} Instituto de Educación Superior SENATI. Todos los derechos reservados.</Text>
        </View>
      </Page>
    </Document>
  );
};