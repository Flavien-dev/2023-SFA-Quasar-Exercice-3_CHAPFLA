<template>
<q-card class="form-card">
  <q-card-section>
    <div class="text-h6 heading">{{ action }} Plat</div>
  </q-card-section>

  <q-card-section>

    <div class="row q-mb-md">
      <q-input
        filled
        v-model="plat.nom"
        label="Nom (Burger)"
        class="col"
        :rules="[val => val.length < 21 || 'Le nom ne doit ni être vide, ni dépasser 20 caractères']"/>
    </div>

    <div class="row q-mb-md">
      <q-input
        filled
        v-model="plat.description"
        label="Description"
        type="textarea"
        class="col"
        :rules="[val => val.length < 156 || 'La description ne doit ni être vide, ni dépasser 155 caractères']" />
    </div>

    <div class="row q-mb-md">
      <q-input
        filled
        v-model="plat.image"
        label="URL de l'image"
        class="col" />
      <q-img
        :src="plat.image ? plat.image : 'statics/image-placeholder.png'"
        class="q-ml-sm"
        contain />
    </div>

    <div class="q-mb-md">
      <div class="row">
        <p class="q-mb-none">Note:</p>
      </div>
      <div class="row">
        <q-rating
          v-model="plat.note"
          size="2em"
          color="orange" />
      </div>
    </div>

  </q-card-section>

  <q-card-actions align="right">
    <q-btn
      label="Annuler"
      color="grey"
      v-close-popup />
    <q-btn
      @click="formSubmit"
      label="Sauver"
      color="primary"
      v-close-popup/>
  </q-card-actions>
</q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['action', 'platAModifier'],
  data () {
    return {
      // initialiser un nouveau plat
      plat: {
        name: '',
        description: '',
        note: 1,
        image: ''
      }
    }
  },
  // appel des méthodes
  methods: {
    // appel des actions qui seront utilisées
    ...mapActions('plats', ['ajouterPlat', 'modifierPlat']),
    /**
     * permet de gérer l'envoi du formulaire
     */
    formSubmit () {
      // vérifie si l'action du formulaire est la modification ou l'ajout d'un plat
      if (this.plat.id) {
        // récupère les anciennes données
        const payload = {
          id: this.plat.id,
          updates: this.plat
        }
        // change les données du plat
        this.modifierPlat(payload)
      } else {
        // ajoute le plat à la page
        this.ajouterPlat(this.plat)
      }
      // ferme le formulaire
      this.$emit('close')
    }
  },
  mounted () {
    // vérifie si l'action voulue de l'utilisateur est de modifier un plat
    if (this.platAModifier) {
      // Copie les propriétés de platAModifier dans un nouvel objet vide
      this.plat = Object.assign({}, this.platAModifier)
    }
  }
}
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
