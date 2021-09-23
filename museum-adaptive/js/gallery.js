const gallery = document.querySelector('.gallery-inner-container');

const sources = [];

const NUMBER_OF_IMAGES = 15;

for (let i = 1; i <= NUMBER_OF_IMAGES; i++) {
  sources.push(i);
}

// code from learn.javascript.ru
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // используем для этого синтаксис "деструктурирующее присваивание"
    [array[i], array[j]] = [array[j], array[i]];
    // то же самое можно записать так:
    // let t = array[i]; array[i] = array[j]; array[j] = t
  }
  return array;
};

const createAndAddNewImgElement = (number) => {
  const image = document.createElement('img');
  image.classList.add('gallery-img');
  image.src = `assets/img/gallery/gallery${number}.jpg`;
  image.alt = `gallery image`;
  gallery.append(image);
  // то же самое можно записать так:
  // const image = `<img src="assets/img/gallery/gallery1.jpg" alt="gallery image" />`;
  // gallery.innerHTML = image;
};

const fillGallery = (array) => {
  shuffleArray(array);
  array.map((item) => createAndAddNewImgElement(item));
};

fillGallery(sources);
