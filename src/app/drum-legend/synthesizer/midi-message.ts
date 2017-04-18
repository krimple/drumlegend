import { NoteTranslator } from './note-translator';
export enum MidiMessageType {
  VM_UNKNOWN,
  VM_KEY_DOWN,
  VM_KEY_UP,
  VM_AFTERTOUCH,
  PITCHBEND,
  CONTROLS,
  UNKNOWN
}

export enum DeviceCategory {
  KEYBOARD,
  DRUMSET,
  COMPLEX_DEVICE
}

export class MidiMessage {
  deviceName: string;
  deviceId: string;
  deviceCategory: DeviceCategory;
  velocity: number;
  channel: number;
  noteNumber: number;
  noteName: string;
  messageRawData: any;
  messageType: MidiMessageType;

  constructor(deviceName: string, deviceId: string, deviceCategory:  DeviceCategory, messageData: any) {
    this.deviceName = deviceName;
    this.deviceId = deviceId;
    this.deviceCategory = deviceCategory;
    this.messageRawData = messageData.data;
    this.velocity = this.messageRawData[2];
    this.noteNumber = this.messageRawData[1];
    if (this.messageRawData[0] === 217) {
      this.messageType = MidiMessageType.UNKNOWN;
    } else if (this.messageRawData[0] === 208 ) {
      this.messageType = MidiMessageType.UNKNOWN;
    } else if (this.messageRawData[0] === 224) {
      this.messageType = MidiMessageType.PITCHBEND;
    } else if (this.messageRawData[0] === 176) {
      this.messageType = MidiMessageType.CONTROLS;
    } else {
      this.decodeNoteMessageData(this.messageRawData);
      this.noteName = NoteTranslator.translateKeyNumberToFirstNoteName(this.messageRawData[1]);
    }

  }

  decodeNoteMessageData(messageRawData: any) {
    if (messageRawData[0] >= 144 && messageRawData[0] <= 159) {
       this.channel = messageRawData[0] - 144;
       this.messageType = MidiMessageType.VM_KEY_DOWN;
    }

    if (messageRawData[0] >= 128 && messageRawData[0] <= 143) {
      this.channel = messageRawData[0] - 128;
      this.messageType = MidiMessageType.VM_KEY_UP;
    }
  }
}
