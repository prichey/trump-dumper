walk(document.body);

function getRandomAdj() {
  return randomChoice([
    'droning',
    'goatish',
    'infectious',
    'mammering',
    'puny',
    'unmuzzled',
    'vain',
    'dangerous',
    'villainous',
    'warped',
    'poisonous',
    'clueless',
    'bloviating',
    'toupéd',
    'clueless',
    'insane',
    'egotistical',
    'rancid',
    'narcissistic',
    'imploding',
    'vile',
    'sinister',
    'impotent',
    'idiotic',
    'senile',
    'festering',
    'infected',
    'repugnant',
    'racist',
    'fat',
    'damaged',
    'illiterate',
    'puerile',
    'inflatable',
    'underwhelming'
  ]);
}

function getRandomAdj2() {
  return randomChoice([
    'two-faced',
    'idle-headed',
    'rump-fed',
    'toad-spotted',
    'tiny-fingered',
    'Cheeto-faced',
    'ferret-wearing',
    'weapons-grade',
    'thin-skinned',
    'tax-dodging',
    'narcissistic',
    'beef-witted',
    'two-faced',
    'rump-fed',
    'toad-spotted',
    'tiny-fingered',
    'Cheeto-faced',
    'ferret-wearing',
    'weapons-grade',
    'thin-skinned',
    'tax-dodging',
    'hail-damaged',
    'small-handed',
    'overly-affirmed',
    'wart-necked',
    'empty-headed',
    'mouth-breathing',
  ]);
}

function getRandomNoun() {
  return randomChoice([
    'fleshbag',
    'dimwit',
    'horn-beast',
    'minnow',
    'pignut',
    'toad',
    'louse',
    'tit',
    'doughnut',
    'spoon',
    'apricot hellbeast',
    'numpty',
    'sociopath',
    'circus peanut',
    'contagion',
    'fartbrain',
    'garbagemonger',
    'scumbag',
    'liar',
    'turd',
    'leech',
    'snake',
    'oxygen thief',
    'casserole',
    'compost pile',
    'dumpster fire',
    'bigot'
  ]);
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function titleCase(str) {
  return str.toLowerCase()
            .split(' ')
            .map(i => i[0].toUpperCase() + i.substring(1))
            .join(' ');
}

function randomChoice(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getRandomInsult(choice) {
  if (!choice) choice = Math.floor(Math.random() * 2) + 1;
  var insult = '';

  switch(choice) {
    case 1:
      insult = getRandomAdj() + ' ' + getRandomNoun();
      break;
    case 2:
      insult = getRandomAdj() + ', ' + getRandomAdj2() + ' ' + getRandomNoun();
      break;
  }

  return titleCase(insult);
}

function walk(node) {
  // I stole this function from here:
  // http://is.gd/mwZp7E

  var child, next;

  switch ( node.nodeType ) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while ( child ) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      if(node.parentElement.tagName.toLowerCase() != "script") {
        handleText(node);
      }

      break;
  }
}

function handleText(textNode) {
  var v = textNode.nodeValue;

  if (v.length && (v.indexOf("Trump") !== -1 || v.indexOf("TRUMP") !== -1)) {
    v = v.replace(/\bDonald Trump\b/g, getRandomInsult());
    v = v.replace(/\bDonald J. Trump\b/g, getRandomInsult());
    v = v.replace(/\bMr. Trump\b/g, getRandomInsult());
    v = v.replace(/\bPresident Trump\b/g, getRandomInsult(2));
    v = v.replace(/\bPresident-elect Trump\b/g, getRandomInsult(2));

    // leave the other trumps alone
    v = v.replace(/\bIvanka Trump\b/g, 'Ivanka Trumptmp');
    v = v.replace(/\bMelania Trump\b/g, 'Melania Trumptmp');
    v = v.replace(/\bEric Trump\b/g, 'Eric Trumptmp');

    v = v.replace(/\b. Trump\b/g, '. ' + getRandomInsult(1));
    v = v.replace(/\b Trump\b/g, ' ' + getRandomInsult(1));
    v = v.replace(/\bTrump\b/g, getRandomInsult(1));
    v = v.replace(/\bTRUMP\b/g, getRandomInsult(1).toUpperCase());

    v = v.replace(/\bTrumptmp\b/g, 'Trump');
  }

  textNode.nodeValue = v;
}
