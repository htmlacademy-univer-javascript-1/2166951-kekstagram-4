export const isEscapeKey = (evt) => evt.key === 'Escape';
export const isImageFile = (file) => file && file.type.startsWith('image/');
export const parseNumber = (string) => parseInt(string, 10);
