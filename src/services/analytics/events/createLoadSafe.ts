import { EventType } from '@/services/analytics/types'

export const CREATE_PACKET_CATEGORY = 'create-packet'

export const CREATE_PACKET_EVENTS = {
  CONTINUE_TO_CREATION: {
    action: 'Continue to creation',
    category: CREATE_PACKET_CATEGORY,
    event: EventType.META,
  },
  OPEN_SAFE_CREATION: {
    action: 'Open stepper',
    category: CREATE_PACKET_CATEGORY,
  },
  NAME_SAFE: {
    event: EventType.META,
    action: 'Name Packet',
    category: CREATE_PACKET_CATEGORY,
  },
  RECIPIENT: {
    event: EventType.META,
    action: 'Recipient_Amount',
    category: CREATE_PACKET_CATEGORY,
  },
  OWNERS: {
    event: EventType.META,
    action: 'Owners',
    category: CREATE_PACKET_CATEGORY,
  },
  THRESHOLD: {
    event: EventType.META,
    action: 'Threshold',
    category: CREATE_PACKET_CATEGORY,
  },
  SUBMIT_CREATE_SAFE: {
    event: EventType.META,
    action: 'Submit Safe creation',
    category: CREATE_PACKET_CATEGORY,
  },
  REJECT_CREATE_SAFE: {
    event: EventType.META,
    action: 'Reject Safe creation',
    category: CREATE_PACKET_CATEGORY,
  },
  RETRY_CREATE_SAFE: {
    event: EventType.META,
    action: 'Retry Safe creation',
    category: CREATE_PACKET_CATEGORY,
  },
  CANCEL_CREATE_SAFE_FORM: {
    action: 'Cancel safe creation form',
    category: CREATE_PACKET_CATEGORY,
  },
  CANCEL_CREATE_SAFE: {
    event: EventType.META,
    action: 'Cancel Safe creation',
    category: CREATE_PACKET_CATEGORY,
  },
  CREATED_SAFE: {
    event: EventType.SAFE_CREATED,
    action: 'Created Safe',
    category: CREATE_PACKET_CATEGORY,
  },
  ACTIVATED_SAFE: {
    event: EventType.SAFE_ACTIVATED,
    action: 'Activated Safe',
    category: CREATE_PACKET_CATEGORY,
  },
  OPEN_HINT: {
    action: 'Open Hint',
    category: CREATE_PACKET_CATEGORY,
  },
}

export const LOAD_SAFE_CATEGORY = 'load-safe'

export const LOAD_SAFE_EVENTS = {
  LOAD_BUTTON: {
    action: 'Open stepper',
    category: LOAD_SAFE_CATEGORY,
  },
  NAME_SAFE: {
    event: EventType.META,
    action: 'Name Safe',
    category: LOAD_SAFE_CATEGORY,
  },
  OWNERS: {
    event: EventType.META,
    action: 'Owners',
    category: LOAD_SAFE_CATEGORY,
  },
  THRESHOLD: {
    event: EventType.META,
    action: 'Threshold',
    category: LOAD_SAFE_CATEGORY,
  },
}
