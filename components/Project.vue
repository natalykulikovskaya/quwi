<template>
  <li class="card" @click="onProjectClick(projectId)">
    <img v-if="!!logoUrl" :src="logoUrl || defaultLogo" class="logo" alt="project logo">
    <span v-if="!logoUrl" class="logo logo--not-exists">No Logo</span>
    <div class="name">
      <span class="name-text">{{ name }}</span>
    </div>
    <div :class="{ status: true, 'status--active': isActive }">
      <span class="status-text">{{ isActive ? 'Active' : 'Inactive' }}</span>
    </div>
    <div class="time">
      <p class="time-row">
        time this week
        <span>{{ spentTimeWeek | formattedTime }}</span>
      </p>
      <p>
        this month
        <span>{{ spentTimeMonth | formattedTime }}</span>
      </p>
      <p>
        total
        <span>{{ spentTimeAll | formattedTime }}</span>
      </p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Project',
  filters: {
    formattedTime (val) {
      const pad = num => (num > 9 ? num : `0${num}`)
      const date = new Date(val)
      const hours = date.getUTCHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }
  },
  props: {
    projectId: {
      type: Number,
      required: true
    },
    spentTimeWeek: {
      type: Number,
      required: true
    },
    spentTimeMonth: {
      type: Number,
      required: true
    },
    spentTimeAll: {
      type: Number,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    logoUrl: {
      type: String,
      default: null,
      required: false
    }
  },
  methods: {
    onProjectClick (id) {
      this.$router.push({ name: 'projects-id', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
$logo-size: 80px;

.card {
  width: 100%;
  min-width: 320px;
  max-width: 768px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin-top: 16px;
  padding: 16px;
  box-shadow: -1px 4px 8px 0px rgba(0, 0, 0, 0.5);

  &:hover {
    cursor: pointer;
  }
  &:last-child {
    margin-bottom: 16px;
  }
  display: grid;
  grid-template-columns: 80px 1fr 0.5fr 1fr;
  grid-gap: 16px;

  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    justify-content: center;
    align-items: center;
    grid-gap: 32px;
  }
}

.logo {
  width: $logo-size;
  height: $logo-size;
  min-height: $logo-size;
  min-width: $logo-size;
  object-fit: cover;
  margin-right: 8px;
  border: 1px solid #0002;
  border-radius: 50%;
  color: #151515;
  font-weight: bold;
  font-size: 0.8rem;

  &--not-exists {
    border: 1px solid #888;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 576px) {
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }
}

.name {
  position: relative;

  &-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    width: 100%;
    line-height: 50px;
    font-size: 1rem;
    font-weight: bold;
    text-align: left;
  }
}

.status {
  position: relative;
  font-size: 1rem;
  color: #7d0000;
  font-weight: bold;

  &--active {
    color: #377d36;
  }
  &-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.time {
  display: grid;
  align-self: center;
  grid-template-rows: 1fr 1fr;
  & p {
    font-size: 1rem;
    line-height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & span {
    font-weight: bold;
  }
}
</style>
