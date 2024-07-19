<template>
  <q-layout view="hHh LpR fFf">
    <SidebarProfile />
    <q-page-container class="q-pb-xl">
      <div
        :class="[
          'flex justify-start items-center q-pa-none',
          quasar.screen.xs ? 'q-ma-lg' : 'q-ma-xl',
        ]"
      >
        <h4
          :class="[
            'text-weight-bold text-primary',
            quasar.screen.xs ? 'q-ml-auto q-mr-auto' : '',
          ]"
          :style="{
            'font-size': quasar.screen.xs
              ? '2.125rem'
              : quasar.screen.sm
              ? '1.75rem'
              : '2.125rem',
            'margin-bottom': quasar.screen.xs ? '37px' : '',
          }"
        >
          Certifications
        </h4>
        <q-input
          :class="[
            'q-ml-auto q-mr-none',
            quasar.screen.xs ? 'q-ml-auto q-mr-auto' : '',
          ]"
          v-model="searchText"
          rounded
          outlined
          label="Search Certifications"
          :style="{
            width: quasar.screen.xs
              ? '80%'
              : quasar.screen.sm
              ? '250px'
              : '300px',
          }"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="q-mx-md q-my-lg q-px-xl">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="white"
          indicator-color="white"
          align="justify"
          narrow-indicator
          inline-label
          active-bg-color="primary"
        >
          <q-tab
            name="allCertifications"
            icon="assignment"
            label="All Certifications"
          ></q-tab>
          <q-tab
            name="forPayment"
            icon="payment"
            label="Pending for Payment"
          ></q-tab>
          <q-tab
            name="forAssignment"
            icon="hourglass_empty"
            label="Pending for Assignment"
          ></q-tab>
        </q-tabs>

        <q-separator class="q-mb-lg"></q-separator>

        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          transition-duration="1000"
        >
          <q-tab-panel name="allCertifications">
            <div v-if="filteredSkills.length">
              <div class="">
                <div class="row q-gutter-md justify-center">
                  <div
                    class="justify-center items-center cursor-pointer"
                    @click="showSkillDetails(skill)"
                    v-for="(skill, index) in filteredSkills"
                    :key="index"
                  >
                    <q-card class="card" flat bordered style="overflow: hidden">
                      <q-img
                        src="../assets/images/card-image.jpg"
                        style="width: 300px; height: 150px"
                      />
                      <q-card-section>
                        <q-btn
                          fab
                          color="primary"
                          icon="done"
                          class="absolute"
                          style="
                            top: 0;
                            right: 12px;
                            transform: translateY(-50%);
                          "
                        />
                        <q-tooltip>
                          <div>Certification is available.</div>
                        </q-tooltip>
                      </q-card-section>

                      <q-card-section class="q-pt-none">
                        <div class="row no-wrap items-center">
                          <div class="col text-h6 ellipsis">
                            {{ skill.name }}
                          </div>
                        </div>
                        <div
                          class="text-caption text-grey"
                          style="
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                          "
                        >
                          {{ skill.description }}
                        </div>
                      </q-card-section>

                      <q-separator />

                      <q-card-section class="q-pt-md">
                        <q-chip color="green" text-color="white">
                          Paid Course
                        </q-chip>
                        <q-chip color="green" text-color="white">
                          Intermediate
                        </q-chip>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="forPayment">
            <div class="row q-gutter-md justify-center">
              <div
                class="justify-center items-center cursor-pointer"
                @click="showSkillDetails(skill)"
                v-for="(skill, index) in filteredSkills"
                :key="index"
              >
                <q-card class="card" flat bordered style="overflow: hidden">
                  <q-img
                    src="../assets/images/card-image.jpg"
                    style="width: 300px; height: 150px"
                  />
                  <q-card-section>
                    <q-btn
                      fab
                      color="red"
                      icon="price_check"
                      class="absolute"
                      style="top: 0; right: 12px; transform: translateY(-50%)"
                    />
                    <q-tooltip>
                      <div>Certification is available.</div>
                    </q-tooltip>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <div class="row no-wrap items-center">
                      <div class="col text-h6 ellipsis">
                        {{ skill.name }}
                      </div>
                    </div>
                    <div
                      class="text-caption text-grey"
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ skill.description }}
                    </div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="q-pt-md">
                    <q-chip color="green" text-color="white">
                      Paid Course
                    </q-chip>
                    <q-chip color="green" text-color="white">
                      Intermediate
                    </q-chip>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="forAssignment">
            <div class="row q-gutter-md justify-center">
              <div
                class="justify-center items-center cursor-pointer"
                @click="showSkillDetails(skill)"
                v-for="(skill, index) in filteredSkills"
                :key="index"
              >
                <q-card class="card" flat bordered style="overflow: hidden">
                  <q-img
                    src="../assets/images/card-image.jpg"
                    style="width: 300px; height: 150px"
                  />
                  <q-card-section>
                    <q-btn
                      fab
                      color="green"
                      icon="pending"
                      class="absolute"
                      style="top: 0; right: 12px; transform: translateY(-50%)"
                    />
                    <q-tooltip>
                      <div>Certification is available.</div>
                    </q-tooltip>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <div class="row no-wrap items-center">
                      <div class="col text-h6 ellipsis">
                        {{ skill.name }}
                      </div>
                    </div>
                    <div
                      class="text-caption text-grey"
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ skill.description }}
                    </div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section class="q-pt-md">
                    <q-chip color="green" text-color="white">
                      Paid Course
                    </q-chip>
                    <q-chip color="green" text-color="white">
                      Intermediate
                    </q-chip>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <q-dialog v-model="showModal">
        <q-card
          class="modal-card absolute"
          flat
          bordered
          style="overflow: hidden; z-index: 9999; width: 90%"
        >
          <q-img src="../assets/images/card-image.jpg" style="height: 100px" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="done"
              class="absolute"
              style="top: 0px; right: 12px; transform: translateY(-50%)"
            >
              <q-tooltip>
                <div>Certification is available.</div>
              </q-tooltip>
            </q-btn>
          </q-card-section>

          <q-card-section
            :class="[
              quasar.screen.gt.xs ? 'q-pa-lg' : 'q-px-md q-pb-md q-pt-none',
            ]"
          >
            <div
              :class="[
                quasar.screen.gt.xs ? 'text-h4' : 'text-h5',
                'text-bold text-primary',
              ]"
            >
              {{ selectedSkill?.name }}
            </div>
            <div
              :class="[
                'text-secondary',
                quasar.screen.xs ? 'q-mt-sm' : 'q-mt-lg',
              ]"
              :style="{ 'font-size': quasar.screen.xs ? '12px' : '' }"
            >
              {{ selectedSkill?.description }}
            </div>
            <q-card-section class="q-py-sm">
              <q-separator />
            </q-card-section>
            <div
              :class="[
                'flex q-mt-sm',
                quasar.screen.xs ? 'justify-center' : '',
              ]"
            >
              <q-chip
                :class="[quasar.screen.gt.xs ? 'q-ml-lg' : 'q-ml-xs']"
                color="green"
                text-color="white"
                :style="{ 'font-size': quasar.screen.xs ? '12px' : '' }"
              >
                Paid Course
              </q-chip>
              <q-chip
                color="green"
                text-color="white"
                :style="{ 'font-size': quasar.screen.xs ? '12px' : '' }"
              >
                Intermediate
              </q-chip>
              <q-btn
                :class="[quasar.screen.xs ? 'q-mt-sm' : 'q-ml-auto']"
                color="amber-9"
                :style="{
                  width: quasar.screen.xs ? '150px' : '200px',
                  'font-size': quasar.screen.xs ? '12px' : '',
                }"
                @click="navigateToApplyCertification(selectedSkill)"
                >Get Certified
              </q-btn>
            </div>
          </q-card-section>

          <q-card-actions class="absolute-top-right">
            <q-btn flat icon="close" @click="showModal = false" color="white" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import SidebarProfile from 'src/components/SidebarProfile.vue';

import { Ref, getCurrentInstance, onMounted, ref, computed, watch } from 'vue';
import { Skill } from 'src/types/Skill';
import { User } from 'src/types/User';
import { fetchSkills, searchLiveSkills } from 'src/services/skillService';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const quasar = useQuasar();
// const fontSize = computed(() => {
//   return quasar.screen.lt.md ? '1.75rem' : '2.125rem';
// });

const router = useRouter();

const Skills = ref<Skill[]>([]);

const user: Ref<User | null> =
  getCurrentInstance()?.appContext.config.globalProperties.$store.user ?? null;

const selectedSkill = ref<Skill | null>(null);

const showModal = ref(false);

const tab = ref('allCertifications');

const searchResults = ref<Skill[]>([]);

const searchText = ref('');

const filteredSkills = computed(() => {
  if (!searchText.value) {
    return Skills.value;
  }
  return searchResults.value.filter((skill) =>
    skill.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

onMounted(async () => {
  try {
    if (user.value?.id) {
      const response = await fetchSkills();
      Skills.value = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch skills:', error);
  }
});

// Method to perform search
const performSearch = async () => {
  if (searchText.value.trim()) {
    try {
      const results = await searchLiveSkills(searchText.value);
      searchResults.value = results;
    } catch (error) {
      console.error('Error performing search:', error);
    }
  } else {
    // Reset search results if search text is cleared
    searchResults.value = [];
  }
};

// Call performSearch when searchText changes
watch(searchText, performSearch, { immediate: true });

const showSkillDetails = (skill: Skill) => {
  selectedSkill.value = skill;
  console.log('This is the selectedSkill: ', selectedSkill.value.name);
  showModal.value = true;
};

const navigateToApplyCertification = (skill: Skill) => {
  router.push(`/certificate/${skill.id}`);
};
</script>

<style scoped>
.card {
  height: 100%;
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  overflow: hidden;
  /* border-color: #45afbe;
  border-width: 3px; */
}

.modal-card {
  width: 100%;
  max-width: 900px;
}
h4 {
  line-height: 0;
}
</style>