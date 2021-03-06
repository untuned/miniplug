import makeProto from '../wrap'
import { partial, parseDate } from '../util'

export default function wrapHistoryEntry (mp, rawEntry) {
  const timestamp = parseDate(rawEntry.timestamp)

  rawEntry.timestamp = timestamp
  rawEntry.time = timestamp // TODO(v2.x) remove this alias
  // wrapMedia expects a playlist ID, but we don't know it--pass null instead.
  rawEntry.media = mp.wrapMedia(null, rawEntry.media)
  rawEntry.user = mp.wrapUser(rawEntry.user)

  if (rawEntry.room) {
    rawEntry.room = mp.wrapRoom(rawEntry.room)
  }

  return makeProto(rawEntry, {
    getUser: partial(mp.getUser, rawEntry.user.id),
    skip: partial(mp.skipDJ, rawEntry.user.id, rawEntry.id)
  })
}
