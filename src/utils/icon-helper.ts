import { 
  mdiHospitalBox,
  mdiHumanPregnant,
  mdiStethoscope,
  mdiDoctor,
  // tambahkan icon lain yang mungkin digunakan
} from '@mdi/js';

/**
 * Fungsi untuk mengkonversi string icon ke path MDI
 */
export const getIconPath = (iconName: string): string => {
  const iconMap: { [key: string]: string } = {
    'hospital': mdiHospitalBox,
    'heart': mdiHumanPregnant,
    'stethoscope': mdiStethoscope,
    'doctor': mdiDoctor,
    // tambahkan mapping icon lainnya
  };

  return iconMap[iconName.toLowerCase()] || mdiStethoscope; // default icon
};
