export function playAudio(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new window.Audio(src);
    audio.onended = () => resolve();
    audio.onerror = (e) => reject(e);
    audio.play();
  });
}
