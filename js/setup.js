'use strict';

var showElement = function (htmlElement) {
  htmlElement.classList.remove('hidden');
};

var getRandomInt = function (max) {
  return Math.round(Math.random() * Math.round(max));
};

var getRandomBool = function () {
  return getRandomInt(1);
};

var getRandomWizardFullName = function (wizardNames, wizardSurnames) {
  var nameIndex = getRandomInt(wizardNames.length - 1);
  var surnameIndex = getRandomInt(wizardNames.length - 1);
  var reverseOrder = getRandomBool();

  if (reverseOrder) {
    return wizardNames[nameIndex] + ' ' + wizardSurnames[surnameIndex];
  } else {
    return wizardSurnames[nameIndex] + ' ' + wizardNames[surnameIndex];
  }
};

var getRandomArrayElem = function (list) {
  var randomIndex = getRandomInt(list.length - 1);

  return list[randomIndex];
};

var getWizards = function (wizardsNumber, wizardsNames, wizardsSurnames, wizardsCoatColors, wizardsEyesColors) {
  var wizards = [];

  for (var i = 0; i < wizardsNumber; i++) {
    var wizard = {
      name: getRandomWizardFullName(wizardsNames, wizardsSurnames),
      coatColor: getRandomArrayElem(wizardsCoatColors),
      eyesColor: getRandomArrayElem(wizardsEyesColors)
    };
    wizards.push(wizard);
  }
  return wizards;
};

var renderWizard = function (wizard, template) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarWizardsList = function (similarWizardsCount) {

  var setup = document.querySelector('.setup');
  var setupSimilar = setup.querySelector('.setup-similar');

  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  showElement(setupSimilar);
  var wizards = getWizards(similarWizardsCount, names, surnames, coatColors, eyesColors);

  for (var i = 0; i < similarWizardsCount; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }

  similarListElement.appendChild(fragment);
};

var getSetupPopup = function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  setupUserName.onfocus = function () {
    this.focused = true;
  };

  setupUserName.onblur = function () {
    this.focused = false;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && (!setupUserName.focused)) {
      closePopup();
    }
  };

  var onSetupCloseEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };

  var onSetupOpenEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
  setupClose.addEventListener('click', closePopup);


  var userNameInput = setup.querySelector('.setup-user-name');
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });
};

var changeEyesFireball = function () {
  var setup = document.querySelector('.setup');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');
  var inputEyes = setup.querySelector('input[name="eyes-color"]');
  var inputFireball = setup.querySelector('input[name="fireball-color"]');
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Получаем случайный цвет.
  var getColor = function (arr) {
    return arr[getRandomInt(arr.length)];
  };

  // Перекрашиваем глаза при клике.
  wizardEyes.addEventListener('click', function () {
    var currentColor = getColor(eyesColors);
    wizardEyes.style.fill = currentColor;
    inputEyes.value = currentColor;
  });

  // Перекрашиваем фаербол при клике.
  fireballWrap.addEventListener('click', function () {
    var currentColor = getColor(fireballColors);
    fireballWrap.style.background = currentColor;
    inputFireball.value = currentColor;
  });
};

createSimilarWizardsList(4);
getSetupPopup();
changeEyesFireball();
