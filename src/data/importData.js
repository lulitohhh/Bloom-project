const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json'); // Tu archivo descargado
const plants = require('./plants.json'); // Tu data

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importData() {
  const batch = db.batch(); // Usamos batch para múltiples escrituras

  Object.entries(plants).forEach(([docId, plantData]) => {
    const docRef = db.collection('plants').doc(docId); // Ej: "anthurium"
    batch.set(docRef, plantData);
  });

  await batch.commit();
  console.log('✅ ¡Datos importados!');
}

importData().catch(console.error);