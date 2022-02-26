import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  contenedor: {
    border: "1px solid gray",
    backgroundColor: "rgb(243, 241, 241)",
  },
  header: {
    // display: "flex",
    justifyContent: "center",
    icono: {
      titulo: {
        color: "rgb(0, 0, 0)",
        fontSize: 28,
      },
    },
    contenido: {},
    numGuia: {},
    numGuiaEnvio: {},
  },
});

const Rotulo = () => (
  <Document>
    <Page  size="A4" style={styles.page}>
      <View style={styles.contenedor}>
        <View style={styles.header}>
          <View style={styles.header.contenido}>
            <Text style={styles.header.icono.titulo}>Heka Entrega</Text>
          </View>
          <View style={styles.header.contenido}>
            <Text >contenido</Text>
          </View>
          <View style={styles.header.numGuia}>
            <Text >guia numero</Text>
          </View>
          <View style={styles.header.numGuiaEnvio}>
            <Text >numero de guia</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default Rotulo;
