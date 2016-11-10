walk(document.body);

function getRandomAdj() {
  return capitalizeFirstLetter(randomChoice([
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
    'empty',
    'vile',
    'sinister',
    'impotent',
    'idiotic',
    'senile',
    'festering',
    'infected',
    'repugnant',
    'moist',
    'rapey',
    'racist',
    'fat',
    'damaged',
    'illiterate',
    'puerile',
    'inflatable',
    'underwhelming'
  ]));
}

function getRandomAdj2() {
  return capitalizeFirstLetter(randomChoice([
    'beef-witted',
    'full-gorged',
    'half-faced',
    'idle-headed',
    'ill-nurtured',
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
    'ass-mouthed',
    'over-affirmed',
    'wart-necked',
    'empty-headed',
    'mouth-breathing',
  ]));
}

function getRandomNoun() {
  return capitalizeFirstLetter(randomChoice([
    'fleshbag',
    'dimwit',
    'horn-beast',
    'minnow',
    'pignut',
    'toad',
    'shitgibbon',
    'tit',
    'doughnut',
    'spoon',
    'fucknugget',
    'apricot hellbeast',
    'numpty',
    'sociopath',
    'circus peanut',
    'asshat',
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
  ]));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomChoice(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getRandomInsult(capitalize, choice) {
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

  if (!!capitalize) insult = capitalizeFirstLetter(insult);
  return insult;
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
    v = v.replace(/\b Donald Trump\b/g, ' ' + getRandomInsult(false));
    v = v.replace(/\b Donald J. Trump\b/g, ' ' + getRandomInsult(false));
    v = v.replace(/\b Mr. Trump\b/g, ' ' + getRandomInsult(false));
    v = v.replace(/\b President Trump\b/g, ' ' + getRandomInsult(false, 2));
    v = v.replace(/\b President-elect Trump\b/g, ' ' + getRandomInsult(false, 2));

    v = v.replace(/\bDonald Trump\b/g, getRandomInsult(true));
    v = v.replace(/\bDonald J. Trump\b/g, getRandomInsult(true));
    v = v.replace(/\bMr. Trump\b/g, getRandomInsult(true));
    v = v.replace(/\bPresident Trump\b/g, getRandomInsult(true, 2));
    v = v.replace(/\bPresident-elect Trump\b/g, getRandomInsult(true, 2));

    // leave the other trumps alone
    v = v.replace(/\bIvanka Trump\b/g, 'Ivanka Trumptmp');
    v = v.replace(/\bMelania Trump\b/g, 'Melania Trumptmp');
    v = v.replace(/\bEric Trump\b/g, 'Eric Trumptmp');

    v = v.replace(/\b. Trump\b/g, '. ' + getRandomInsult(true, 1));
    v = v.replace(/\b Trump\b/g, ' ' + getRandomInsult(false, 1));
    v = v.replace(/\bTrump\b/g, getRandomInsult(true, 1));
    v = v.replace(/\bTRUMP\b/g, getRandomInsult(true, 1).toUpperCase());

    v = v.replace(/\bTrumptmp\b/g, 'Trump');
  }

  textNode.nodeValue = v;
}
