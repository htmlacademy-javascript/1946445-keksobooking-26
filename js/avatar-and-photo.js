import {FILE_TYPES} from './const.js';

const avatarChooserElement = document.querySelector('.ad-form__field').querySelector('input');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview').querySelector('img');
const photoChooserElement = document.querySelector('.ad-form__upload').querySelector('input');
const photoContainerElement = document.querySelector('.ad-form__photo');

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

photoChooserElement.addEventListener('change', () => {
  const file = photoChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoContainerElement.textContent = '';
    const photoPreview = document.createElement('img');
    photoPreview.src = URL.createObjectURL(file);
    photoPreview.width = 70;
    photoPreview.height = 70;
    photoContainerElement.append(photoPreview);
  }
});

const resetImages = () => {
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  photoContainerElement.textContent = '';
};

export {resetImages};
