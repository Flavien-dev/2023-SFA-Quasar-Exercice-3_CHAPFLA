// State : données du magasin
const state = {

  plats: [
    {
      id: 1,
      image: 'https://i.imgur.com/0umadnY.jpg',
      nom: 'Burger',
      description: "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
      note: 4
    },
    {
      id: 2,
      image: 'https://i.imgur.com/b9zDbyb.jpg',
      nom: 'Pizza',
      description: "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
      note: 5
    },
    {
      id: 3,
      image: 'https://i.imgur.com/RbKjUjB.jpg',
      nom: 'Petits choux',
      description:
        'Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...',
      note: 1
    },
    {
      id: 4,
      image: 'https://i.imgur.com/xAuhNVg.jpg',
      nom: 'BBQ Ribs',
      description: 'Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.',
      note: 5
    }
  ]
}

const getters = {
  plats: (state) => {
    return [...state.plats].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
    // TODO retourner un copie et par une référence
    // TODO les getters servent souvent à filter et trier les données
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // https://usefulangle.com/post/227/javascript-sort-array-of-objects
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  }
}

const mutations = {
  /**
   * Ajoute le plat au magasin
   * @param state le magsin
   * @param plat plat à ajouter
   */
  AJOUTER_PLAT (state, plat) {
    state.plats.push(plat)
  },
  /**
   * modifie le plat au magasin
   * @param state le magasin
   * @param payload les anciennes données du magasin
   * @constructor
   */
  MODIFIER_PLAT (state, payload) {
    // Recherche le plat et retourne sa position dans le tableau, son index
    const index = state.plats.findIndex(el => el.id === payload.id)

    // Si un plat a été trouvée
    if (index !== -1) {
      // Modifie l'objet trouvé avec les nouvelles valeurs
      Object.assign(state.plats[index], payload.updates)
    }
  },
  /**
   * supprime le plat du magasin
   * @param state le magasin
   * @param id identifiant du plat à supprimer
   * @constructor
   */
  SUPPRIMER_PLAT: (state, id) => {
    state.plats = state.plats.filter(el => el.id !== id)
  }
}

const actions = {
  /**
   * modifie un plat en changeant ses anciennes données
   * @param commit action à effectuer
   * @param payload anciennes données
   */
  modifierPlat ({ commit }, payload) {
    // Valide la mutation et y passe les données
    commit('MODIFIER_PLAT', payload)
  },
  /**
   * ajoute un plat à la liste des plats
   * @param commit action à effectuer
   * @param plat plat à ajouter
   */
  ajouterPlat ({ commit }, plat) {
    let uId = 1
    // Si le tableau contient des éléments
    if (state.plats.length) {
      // Récupère l'id MAX et lui ajoute 1
      uId = Math.max(...state.plats.map(plat => plat.id)) + 1
    }
    // Ajoute le nouvel id au plat
    plat.id = uId
    // Commite l'ajout
    commit('AJOUTER_PLAT', plat)
  },
  /**
   * supprime le plat en fonction de l'id
   * @param commit action à effectuer
   * @param id identifiant du plat
   */
  supprimerPlat ({ commit }, id) {
    commit('SUPPRIMER_PLAT', id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
