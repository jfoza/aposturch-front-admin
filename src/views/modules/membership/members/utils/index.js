import profilesUniqueName from '@core/utils/profiles'
import provider from '@/store'

const userId = provider.state.sessions.userData.id

export const isEnabledToUpdateByAdminChurch = member => {
  if (userId === member.user_id) {
    return true
  }

  const profilesAllowed = [
    profilesUniqueName.ADMIN_MODULE,
    profilesUniqueName.ASSISTANT,
    profilesUniqueName.MEMBER,
  ]

  return profilesAllowed.includes(member.profile_unique_name)
}

export const isEnabledToUpdateByAdminModule = member => {
  if (userId === member.user_id) {
    return true
  }

  const profilesAllowed = [
    profilesUniqueName.ASSISTANT,
    profilesUniqueName.MEMBER,
  ]

  return profilesAllowed.includes(member.profile_unique_name)
}

export const isEnabledToUpdateByAssistant = member => {
  if (userId === member.user_id) {
    return true
  }

  const profilesAllowed = [
    profilesUniqueName.MEMBER,
  ]

  return profilesAllowed.includes(member.profile_unique_name)
}

export const isEnabledToUpdateStatusByAdminChurch = member => {
  const profilesAllowed = [
    profilesUniqueName.ADMIN_MODULE,
    profilesUniqueName.ASSISTANT,
    profilesUniqueName.MEMBER,
  ]

  return profilesAllowed.includes(member.profile_unique_name)
}
