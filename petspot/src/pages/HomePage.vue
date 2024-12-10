<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import AppNavbarComponent from "../components/AppNavbarComponent.vue";

declare const __API_BASE_URL__: string;

interface Pet {
  id?: number;
  name: string;
  species: string;
  breed: string;
  weight: number;
  dateOfBirth?: string;
  gender: string;
  isNeutered: boolean;
  color?: string;
  owner: {
    id: number;
  };
}

interface Vaccine {
  id: number;
  name: string;
  dateGiven: string;
}

// Estado
const pets = ref<Pet[]>([]);
const isEditing = ref(false);
const showModal = ref(false);

// Dados para cadastro de novo Pet
const newPetName = ref("");
const newPetSpecies = ref("");
const newPetBreed = ref("");
const newPetWeight = ref<number | null>(null);
const newPetDateOfBirth = ref("");
const newPetGender = ref("");
const newPetIsNeutered = ref(false);
const newPetColor = ref("");

// Mensagens de erro/sucesso no cadastro
const errorMessage = ref<string[]>([]);
const successMessage = ref("");

// Modal para detalhes do Pet
const showDetailsModal = ref(false);
const selectedPet = ref<Pet | null>(null);
const selectedPetVaccines = ref<Vaccine[]>([]);
const loadingVaccines = ref(false);
const vaccinesError = ref<string>("");

// Edição de dados do pet no modal de detalhes
const isPetDetailsEditing = ref(false);

// Dados para edição do pet selecionado
const editPetName = ref("");
const editPetSpecies = ref("");
const editPetBreed = ref("");
const editPetWeight = ref<number | null>(null);
const editPetDateOfBirth = ref("");
const editPetGender = ref("");
const editPetIsNeutered = ref(false);
const editPetColor = ref("");

// Listas pré-definidas de espécies, raças e cores
const speciesOptions = [
  { value: "DOG", label: "Cachorro" },
  { value: "CAT", label: "Gato" },
  { value: "BIRD", label: "Papagaio" },
];

const breedOptions = ref<string[]>([]);
const colorOptions = ref<string[]>([]);

const breedsBySpecies: Record<string, string[]> = {
  DOG: ["Bulldog", "Labrador", "Poodle", "Pinscher", "Dachshund"],
  CAT: ["Siamese", "Persian", "Sphynx", "Angora", "British Shorthair"],
  BIRD: ["Papagaio", "Calopsita", "Canário", "Periquito"],
};

const colorsBySpecies: Record<string, string[]> = {
  DOG: ["Marrom", "Preto", "Branco", "Caramelo", "Cinza"],
  CAT: ["Cinza", "Preto", "Branco", "Laranja", "Rajado"],
  BIRD: ["Verde", "Azul", "Amarelo", "Vermelho", "Colorido"],
};

const genderOptions = [
  { value: "MALE", label: "Masculino" },
  { value: "FEMALE", label: "Feminino" },
  { value: "UNKNOWN", label: "Desconhecido" },
];

const neuteredOptions = [
  { value: true, label: "Sim" },
  { value: false, label: "Não" },
];

// Simulando owner fixo
const ownerId = 1;

// Computed para validação do cadastro
const isFormValid = computed(() => {
  errorMessage.value = [];
  if (!newPetName.value.trim())
    errorMessage.value.push("O nome do Pet é obrigatório.");
  if (!newPetSpecies.value.trim())
    errorMessage.value.push("A espécie do Pet é obrigatória.");
  if (!newPetBreed.value.trim())
    errorMessage.value.push("A raça do Pet é obrigatória.");
  if (newPetWeight.value === null || newPetWeight.value <= 0)
    errorMessage.value.push("O peso do Pet deve ser um número positivo.");
  if (!newPetGender.value.trim())
    errorMessage.value.push("O gênero do Pet é obrigatório.");

  return errorMessage.value.length === 0;
});

// Observa mudanças de espécie para atualizar raças e cores do cadastro
watch(newPetSpecies, (val) => {
  const upperVal = val.trim().toUpperCase();
  breedOptions.value = breedsBySpecies[upperVal] || [];
  colorOptions.value = colorsBySpecies[upperVal] || [];

  newPetBreed.value = "";
  newPetColor.value = "";
});

// Função para atualizar as opções de raça e cor no modo de edição do pet no modal
function updateEditOptions() {
  const upperVal = editPetSpecies.value.trim().toUpperCase();
  breedOptions.value = breedsBySpecies[upperVal] || [];
  colorOptions.value = colorsBySpecies[upperVal] || [];

  // Se a raça ou cor atual não existir mais nas opções, limpa
  if (!breedOptions.value.includes(editPetBreed.value)) {
    editPetBreed.value = "";
  }
  if (!colorOptions.value.includes(editPetColor.value)) {
    editPetColor.value = "";
  }
}

watch(editPetSpecies, () => {
  updateEditOptions();
});

// Funções CRUD
async function fetchPets() {
  try {
    const response = await fetch(`${__API_BASE_URL__}/api/pets`);
    if (response.ok) {
      const data = await response.json();
      pets.value = data;
    }
  } catch (err) {
    console.error("Erro ao buscar pets:", err);
  }
}

async function createPet() {
  if (!isFormValid.value) return;

  const payload: Pet = {
    name: newPetName.value.trim(),
    species: newPetSpecies.value.trim().toUpperCase(),
    breed: newPetBreed.value.trim(),
    weight: newPetWeight.value ?? 0,
    dateOfBirth: newPetDateOfBirth.value || undefined,
    gender: newPetGender.value.trim().toUpperCase(),
    isNeutered: newPetIsNeutered.value,
    color: newPetColor.value || undefined,
    owner: {
      id: ownerId,
    },
  };

  try {
    const response = await fetch(`${__API_BASE_URL__}/api/pets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const newPet = await response.json();
      pets.value.push(newPet);
      successMessage.value = "Pet cadastrado com sucesso!";
      // Limpa o form
      newPetName.value = "";
      newPetSpecies.value = "";
      newPetBreed.value = "";
      newPetWeight.value = null;
      newPetDateOfBirth.value = "";
      newPetGender.value = "";
      newPetIsNeutered.value = false;
      newPetColor.value = "";
      // Fecha modal após delay
      setTimeout(() => {
        showModal.value = false;
        successMessage.value = "";
      }, 1500);
    } else {
      errorMessage.value = [
        "Erro ao cadastrar o Pet. Verifique os dados e tente novamente.",
      ];
    }
  } catch (err) {
    errorMessage.value = ["Erro de conexão ao cadastrar o Pet."];
  }
}

async function deletePet(id: number) {
  try {
    const response = await fetch(`${__API_BASE_URL__}/api/pets/${id}`, {
      method: "DELETE",
    });
    if (response.ok || response.status === 204) {
      pets.value = pets.value.filter((p) => p.id !== id);
    } else {
      console.error("Erro ao deletar pet:", response.statusText);
    }
  } catch (err) {
    console.error("Erro ao deletar pet:", err);
  }
}

// Função para atualizar o pet após edição
async function updatePet() {
  if (!selectedPet.value?.id) return;

  // Validação simples da edição
  const editErrors: string[] = [];
  if (!editPetName.value.trim())
    editErrors.push("O nome do Pet é obrigatório.");
  if (!editPetSpecies.value.trim())
    editErrors.push("A espécie do Pet é obrigatória.");
  if (!editPetBreed.value.trim())
    editErrors.push("A raça do Pet é obrigatória.");
  if (editPetWeight.value === null || editPetWeight.value <= 0)
    editErrors.push("O peso do Pet deve ser um número positivo.");
  if (!editPetGender.value.trim())
    editErrors.push("O gênero do Pet é obrigatório.");

  if (editErrors.length > 0) {
    errorMessage.value = editErrors;
    return;
  } else {
    errorMessage.value = [];
  }

  const payload: Pet = {
    name: editPetName.value.trim(),
    species: editPetSpecies.value.trim().toUpperCase(),
    breed: editPetBreed.value.trim(),
    weight: editPetWeight.value ?? 0,
    dateOfBirth: editPetDateOfBirth.value || undefined,
    gender: editPetGender.value.trim().toUpperCase(),
    isNeutered: editPetIsNeutered.value,
    color: editPetColor.value || undefined,
    owner: {
      id: ownerId,
    },
  };

  try {
    const response = await fetch(
      `${__API_BASE_URL__}/api/pets/${selectedPet.value.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) {
      const updatedPet = await response.json();
      // Atualiza a lista de pets
      const index = pets.value.findIndex((p) => p.id === selectedPet.value?.id);
      if (index !== -1) {
        pets.value[index] = updatedPet;
      }
      // Atualiza o selectedPet
      selectedPet.value = updatedPet;
      successMessage.value = "Pet atualizado com sucesso!";
      // Sai do modo edição após um delay
      setTimeout(() => {
        isPetDetailsEditing.value = false;
        successMessage.value = "";
      }, 1500);
    } else {
      errorMessage.value = ["Erro ao atualizar o Pet. Verifique os dados."];
    }
  } catch (err) {
    errorMessage.value = ["Erro de conexão ao atualizar o Pet."];
  }
}

// Vacinas do Pet
async function fetchPetVaccines(petId: number) {
  vaccinesError.value = "";
  loadingVaccines.value = true;
  selectedPetVaccines.value = [];
  try {
    const response = await fetch(
      `${__API_BASE_URL__}/api/pets/${petId}/vaccines`
    );
    if (response.ok) {
      const data = await response.json();
      selectedPetVaccines.value = data;
    } else {
      vaccinesError.value = "Não foi possível carregar as vacinas do pet.";
    }
  } catch (err) {
    vaccinesError.value = "Erro de conexão ao tentar carregar as vacinas.";
  } finally {
    loadingVaccines.value = false;
  }
}

function openPetDetails(pet: Pet) {
  if (!isEditing.value) {
    selectedPet.value = pet;
    showDetailsModal.value = true;
    loadPetEditData(pet);
    if (pet.id) fetchPetVaccines(pet.id);
  }
}

// Carrega dados do pet selecionado para edição
function loadPetEditData(pet: Pet) {
  editPetName.value = pet.name;
  editPetSpecies.value = pet.species;
  editPetBreed.value = pet.breed;
  editPetWeight.value = pet.weight;
  editPetDateOfBirth.value = pet.dateOfBirth || "";
  editPetGender.value = pet.gender;
  editPetIsNeutered.value = pet.isNeutered;
  editPetColor.value = pet.color || "";

  updateEditOptions();
}

function toggleEdit() {
  isEditing.value = !isEditing.value;
}

function toggleDetailsEdit() {
  isPetDetailsEditing.value = !isPetDetailsEditing.value;
  if (!isPetDetailsEditing.value && selectedPet.value) {
    // Se saiu do modo edição sem salvar, restaura dados originais
    loadPetEditData(selectedPet.value);
    errorMessage.value = [];
  }
}

onMounted(() => {
  fetchPets();
});
</script>

<template>
  <AppNavbarComponent />
  <div class="container py-4">
    <div
      class="row d-flex flex-column justify-content-between align-items-center gap-4"
    >
      <div
        class="col-12 col-md-12 col-lg-12 col-xl-6 d-flex justify-content-center align-items-center gap-3 p-md-5 p-4 w-100"
      >
        <!-- Botão Cadastrar Pet -->
        <div class="card rounded-5 border-0 shadow bg-light p-3">
          <button
            class="btn btn-primary rounded-5 shadow p-2 d-flex justify-content-center align-items-center gap-2 text-white"
            @click="showModal = true"
          >
            Cadastrar Pet<ion-icon name="add-circle" class="fs-3"></ion-icon>
          </button>
        </div>
        <!-- Botão Editar Pets -->
        <div
          v-if="pets.length > 1"
          class="card rounded-5 border-0 shadow bg-light p-3"
        >
          <button
            class="btn btn-primary rounded-5 shadow p-2 d-flex justify-content-center align-items-center gap-2 text-white"
            @click="toggleEdit"
          >
            Editar Pets<ion-icon name="create" class="fs-3"></ion-icon>
          </button>
        </div>
      </div>
      <hr />
      <!-- Lista de Pets (cards) -->
      <div
        class="col-12 col-md-12 col-lg-12 col-xl-6 d-flex justify-content-center align-items-center gap-3 p-md-5 p-4 w-100 flex-wrap"
      >
        <div
          v-for="pet in pets"
          :key="pet.id"
          class="card pet-card rounded-5 border-0 shadow bg-light position-relative"
        >
          <div
            class="card-body d-flex flex-column align-items-start"
            @click="openPetDetails(pet)"
          >
            <h5 class="card-title pet-name">{{ pet.name }}</h5>
            <hr class="w-100" />
            <p class="card-text pet-info mb-0">
              <strong>Espécie:</strong> {{ pet.species }}<br />
              <strong>Raça:</strong> {{ pet.breed }}<br />
              <strong>Peso:</strong> {{ pet.weight }} kg<br />
              <strong>Gênero:</strong> {{ pet.gender }}<br />
              <strong>Neutrado:</strong> {{ pet.isNeutered ? "Sim" : "Não"
              }}<br />
              <span v-if="pet.dateOfBirth"
                ><strong>Nasc:</strong> {{ pet.dateOfBirth }}</span
              ><br />
              <span v-if="pet.color"
                ><strong>Cor:</strong> {{ pet.color }}</span
              >
            </p>
          </div>
          <!-- Se estiver em modo de edição, mostra botão deletar -->
          <div v-if="isEditing" class="position-absolute top-0 end-0 m-3">
            <button
              class="btn btn-sm btn-danger rounded-pill d-flex align-items-center gap-1"
              @click.stop="deletePet(pet.id!)"
            >
              Deletar<ion-icon name="trash"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Detalhes do Pet -->
  <div
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    v-if="showDetailsModal"
    style="display: block; background: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content rounded-4 shadow p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="modal-title">Detalhes do Pet</h5>
          <button
            class="btn btn-sm btn-secondary"
            @click="showDetailsModal = false"
          >
            Fechar
          </button>
        </div>
        <!-- Botão para entrar/sair do modo edição -->
        <div class="d-flex justify-content-end gap-2 mb-3">
          <button
            class="btn btn-secondary rounded-pill"
            v-if="isPetDetailsEditing"
            @click="toggleDetailsEdit"
          >
            Cancelar
          </button>
          <button
            class="btn btn-primary rounded-pill"
            @click="isPetDetailsEditing ? updatePet() : toggleDetailsEdit()"
          >
            {{ isPetDetailsEditing ? "Salvar" : "Editar" }}
          </button>
        </div>

        <div class="row">
          <div class="col-12 col-md-6">
            <!-- Card expandido - se estiver editando, mostra inputs -->
            <div class="card rounded-5 border-0 shadow bg-light p-3">
              <template v-if="!isPetDetailsEditing">
                <h5 class="card-title pet-name mb-3">
                  {{ selectedPet?.name }}
                </h5>
                <p class="card-text pet-info mb-0">
                  <strong>Espécie:</strong> {{ selectedPet?.species }}<br />
                  <strong>Raça:</strong> {{ selectedPet?.breed }}<br />
                  <strong>Peso:</strong> {{ selectedPet?.weight }} kg<br />
                  <strong>Gênero:</strong> {{ selectedPet?.gender }}<br />
                  <strong>Neutrado:</strong>
                  {{ selectedPet?.isNeutered ? "Sim" : "Não" }}<br />
                  <span v-if="selectedPet?.dateOfBirth"
                    ><strong>Nasc:</strong> {{ selectedPet?.dateOfBirth }}</span
                  ><br />
                  <span v-if="selectedPet?.color"
                    ><strong>Cor:</strong> {{ selectedPet?.color }}</span
                  >
                </p>
              </template>
              <template v-else>
                <div class="mb-3">
                  <label class="form-label">Nome</label>
                  <input
                    v-model="editPetName"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Espécie</label>
                  <select v-model="editPetSpecies" class="form-select">
                    <option value="">Selecione uma espécie</option>
                    <option
                      v-for="(spec, index) in speciesOptions"
                      :key="index"
                      :value="spec.value"
                    >
                      {{ spec.label }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Raça</label>
                  <select v-model="editPetBreed" class="form-select">
                    <option value="">Selecione a raça</option>
                    <option
                      v-for="(breed, index) in breedOptions"
                      :key="index"
                      :value="breed"
                    >
                      {{ breed }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Peso (kg)</label>
                  <input
                    v-model.number="editPetWeight"
                    type="number"
                    class="form-control"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label"
                    >Data de Nascimento (opcional)</label
                  >
                  <input
                    v-model="editPetDateOfBirth"
                    type="date"
                    class="form-control"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Gênero</label>
                  <select v-model="editPetGender" class="form-select">
                    <option value="">Selecione o gênero</option>
                    <option
                      v-for="(gen, index) in genderOptions"
                      :key="index"
                      :value="gen.value"
                    >
                      {{ gen.label }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Castrado?</label>
                  <select v-model="editPetIsNeutered" class="form-select">
                    <option
                      v-for="(opt, index) in neuteredOptions"
                      :key="index"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Cor (opcional)</label>
                  <select v-model="editPetColor" class="form-select">
                    <option value="">Selecione a cor</option>
                    <option
                      v-for="(col, index) in colorOptions"
                      :key="index"
                      :value="col"
                    >
                      {{ col }}
                    </option>
                  </select>
                </div>
              </template>
            </div>
            <!-- Mensagens de erro/sucesso no modal de detalhes -->
            <div v-if="errorMessage.length" class="text-danger mt-3">
              <ul>
                <li v-for="(err, index) in errorMessage" :key="index">
                  {{ err }}
                </li>
              </ul>
            </div>
            <div v-if="successMessage" class="text-success mt-3">
              {{ successMessage }}
            </div>
          </div>

          <div class="col-12 col-md-6 mt-3 mt-md-0">
            <!-- Lista de vacinas estilo card -->
            <h6 class="mb-3">Vacinas do Pet</h6>
            <div v-if="loadingVaccines">Carregando vacinas...</div>
            <div v-else-if="vaccinesError">
              <p class="text-danger">{{ vaccinesError }}</p>
            </div>
            <div v-else>
              <div v-if="!selectedPetVaccines.length" class="text-muted">
                Nenhuma vacina encontrada.
              </div>
              <div v-else class="d-flex flex-wrap gap-3">
                <div
                  v-for="vac in selectedPetVaccines"
                  :key="vac.id"
                  class="card rounded-5 border-0 shadow bg-light p-3"
                  style="min-width: 200px"
                >
                  <strong>{{ vac.name }}</strong>
                  <small class="text-muted">Data: {{ vac.dateGiven }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Cadastro de Pet -->
  <div
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    v-if="showModal"
    style="display: block; background: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content rounded-4 shadow p-4">
        <h5 class="modal-title">Cadastrar Novo Pet</h5>
        <form @submit.prevent="createPet" class="mt-3">
          <div class="mb-3">
            <label class="form-label">Nome</label>
            <input
              v-model="newPetName"
              type="text"
              class="form-control"
              placeholder="Ex: Rex"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Espécie</label>
            <select v-model="newPetSpecies" class="form-select">
              <option value="">Selecione uma espécie</option>
              <option
                v-for="(spec, index) in speciesOptions"
                :key="index"
                :value="spec.value"
              >
                {{ spec.label }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Raça</label>
            <select v-model="newPetBreed" class="form-select">
              <option value="">Selecione a raça</option>
              <option
                v-for="(breed, index) in breedOptions"
                :key="index"
                :value="breed"
              >
                {{ breed }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Peso (kg)</label>
            <input
              v-model.number="newPetWeight"
              type="number"
              class="form-control"
              placeholder="Ex: 12"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Data de Nascimento (opcional)</label>
            <input
              v-model="newPetDateOfBirth"
              type="date"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Gênero</label>
            <select v-model="newPetGender" class="form-select">
              <option value="">Selecione o gênero</option>
              <option
                v-for="(gen, index) in genderOptions"
                :key="index"
                :value="gen.value"
              >
                {{ gen.label }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Castrado?</label>
            <select v-model="newPetIsNeutered" class="form-select">
              <option
                v-for="(opt, index) in neuteredOptions"
                :key="index"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Cor (opcional)</label>
            <select v-model="newPetColor" class="form-select">
              <option value="">Selecione a cor</option>
              <option
                v-for="(col, index) in colorOptions"
                :key="index"
                :value="col"
              >
                {{ col }}
              </option>
            </select>
          </div>

          <div v-if="errorMessage.length" class="text-danger mb-3">
            <ul>
              <li v-for="(err, index) in errorMessage" :key="index">
                {{ err }}
              </li>
            </ul>
          </div>

          <div v-if="successMessage" class="text-success mb-3">
            {{ successMessage }}
          </div>

          <div class="d-flex justify-content-end gap-2 mt-3">
            <button
              type="button"
              class="btn btn-secondary rounded-pill"
              @click="showModal = false"
            >
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary rounded-pill">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pet-card {
  width: 250px;
  cursor: pointer;
  transition: transform 0.3s;
  position: relative;
}
.pet-card:hover {
  transform: scale(1.02);
}
.pet-name {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}
.pet-info {
  font-size: 0.9rem;
  color: #444;
}
</style>
