import {FILE_TYPES} from './const.js';

const avatarChooser = document.querySelector('.ad-form__field').querySelector('input');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const photoChooser = document.querySelector('.ad-form__upload').querySelector('input');
const photoContainer = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoContainer.textContent = '';
    const photoPreview = document.createElement('img');
    photoPreview.src = URL.createObjectURL(file);
    photoPreview.width = 70;
    photoPreview.height = 70;
    photoContainer.append(photoPreview);
  }
});

const resetImages = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoContainer.textContent = '';
};

export {resetImages};
