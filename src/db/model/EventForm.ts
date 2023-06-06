import { Model } from "@nozbe/watermelondb"
import {
  field,
  text,
  json,
  date,
  readonly,
  writer,
} from "@nozbe/watermelondb/decorators"


export default class EventFormModel extends Model {
  static table = "event_forms"

  @text("name") name;
  @text("description") description;
  @text("language") language
  @field("is_editable") isEditable
  @field("is_snapshopt_form") isSnapshotForm
  @json("metadata", sanitizeMetadata) metadata
  @field("is_deleted") isDeleted
  @date("deleted_at") deletedAt
  @readonly @date("created_at") createdAt
  @readonly @date("updated_at") updatedAt
}


// NOTE: can add sanitization logic if needed
function sanitizeMetadata(data) {
  if (data) {
    return JSON.stringify(data)
  }
  return JSON.stringify({})
}
