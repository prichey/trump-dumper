walk(document.body);

function getRandomAdj() {
  return randomChoice([
    'artless',
    'droning',
    'frothy',
    'goatish',
    'infectious',
    'lumpish',
    'mammering',
    'mangled',
    'puking',
    'puny',
    'unmuzzled',
    'vain',
    'venomed',
    'villainous',
    'warped',
    'poisonous',
    'fishified',
    'wart-necked',
    'weaselheaded',
    'mangled',
    'clueless',
    'bloviating',
    'toupéd',
  ]);
}

function getRandomAdj2() {
  return randomChoice([
    'beef-witted',
    'full-gorged',
    'half-faced',
    'idle-headed',
    'ill-nurtured',
    'rump-fed',
    'tickle-brained',
    'toad-spotted',
    'unwashed',
    'tiny-fingered',
    'Cheeto-faced',
    'ferret-wearing',
    'weapons-grade',
    'utter',
  ]);
}

function getRandomNoun() {
  return randomChoice([
    'hellbeast',
    'fleshbag',
    'dimwit',
    'horn-beast',
    'minnow',
    'pignut',
    'toad',
    'cocksplat',
    'shitgibbon',
    'tit',
    'twonk',
    'doughnut',
    'spoon',
    'gobshite',
    'fucknugget',
    'apricot hellbeast',
    'eejit',
    'numpty',
    'fucktrumpet',
  ]);
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
    v = v.replace(/\b Donald Trump\b/g, ' ' + getRandomInsult(false) + ' Donald Trumptmp');
    v = v.replace(/\b Donald J. Trump\b/g, ' ' + getRandomInsult(false) + ' Donald J. Trumptmp');
    v = v.replace(/\b Mr. Trump\b/g, ' ' + getRandomInsult(false) + ' Mr. Trumptmp');
    v = v.replace(/\b President Trump\b/g, ' ' + getRandomInsult(false, 2) + ' President Trumptmp');
    v = v.replace(/\b President-elect Trump\b/g, ' ' + getRandomInsult(false, 2) + ' President-elect Trumptmp');

    v = v.replace(/\bDonald Trump\b/g, getRandomInsult(true) + ' Donald Trumptmp');
    v = v.replace(/\bDonald J. Trump\b/g, getRandomInsult(true) + ' Donald J. Trumptmp');
    v = v.replace(/\bMr. Trump\b/g, getRandomInsult(true) + ' Mr. Trumptmp');
    v = v.replace(/\bPresident Trump\b/g, getRandomInsult(true, 2) + ' President Trumptmp');
    v = v.replace(/\bPresident-elect Trump\b/g, getRandomInsult(true, 2) + ' President-elect Trumptmp');

    // leave the other trumps alone
    v = v.replace(/\bIvanka Trump\b/g, 'Ivanka Trumptmp');
    v = v.replace(/\bMelania Trump\b/g, 'Melania Trumptmp');
    v = v.replace(/\bEric Trump\b/g, 'Eric Trumptmp');

    v = v.replace(/\b. Trump\b/g, '. ' + getRandomInsult(true, 1) + ' Trumptmp');
    v = v.replace(/\b Trump\b/g, ' ' + getRandomInsult(false, 1) + ' Trumptmp');
    v = v.replace(/\bTrump\b/g, getRandomInsult(true, 1) + ' Trumptmp');
    v = v.replace(/\bTRUMP\b/g, getRandomInsult(true, 1).toUpperCase() + ' TRUMPTMP');

    v = v.replace(/\bTrumptmp\b/g, 'Trump');
    v = v.replace(/\bTRUMPTMP\b/g, 'TRUMP');
  }

  textNode.nodeValue = v;
}
