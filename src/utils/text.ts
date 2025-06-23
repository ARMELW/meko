/**
 * Tronque un texte en gardant les mots entiers
 * @param text - Le texte à tronquer
 * @param maxLength - La longueur maximale
 * @returns Le texte tronqué avec "..." si nécessaire
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // Si on trouve un espace, on coupe au dernier mot complet
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  // Sinon on coupe brutalement
  return truncated + '...';
}

/**
 * Formate le nom d'affichage en gérant les noms longs
 * @param firstname - Prénom
 * @param lastname - Nom de famille
 * @param maxLength - Longueur maximale (défaut: 20)
 * @returns Le nom formaté et tronqué si nécessaire
 */
export function formatDisplayName(firstname: string, lastname: string, maxLength: number = 20): string {
  const fullName = `${firstname} ${lastname}`;
  
  // Si le nom complet est court, on le retourne tel quel
  if (fullName.length <= maxLength) {
    return fullName;
  }
  
  // Si juste le prénom dépasse, on le tronque
  if (firstname.length >= maxLength) {
    return truncateText(firstname, maxLength - 3);
  }
  
  // Sinon on tronque le nom complet en essayant de garder au moins le prénom
  const minFirstnameLength = Math.min(firstname.length, maxLength - 5); // -5 pour laisser de la place au nom
  const remainingLength = maxLength - minFirstnameLength - 1; // -1 pour l'espace
  
  if (remainingLength > 3) {
    return `${firstname.substring(0, minFirstnameLength)} ${truncateText(lastname, remainingLength)}`;
  }
  
  // En dernier recours, juste le prénom tronqué
  return truncateText(firstname, maxLength);
}
