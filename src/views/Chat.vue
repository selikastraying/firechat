<template>
  <div class="bg" style="height: 100vh; width: 100vw">
    <div class="nav justify-content-end border-bottom p-3" style="height: 10%">
      <a class="nav-link my-auto" @click="room = ''" href="#" v-if="isChating">
        ←Back
      </a>
      <a
        class="nav-link my-auto"
        :class="{ disabled: !isRoomlist }"
        @click="isRoomlist = false"
        href="#"
        v-if="!isChating"
      >
        找人聊天
      </a>
      <a
        class="nav-link my-auto"
        :class="{ disabled: isRoomlist }"
        @click="isRoomlist = true"
        href="#"
        v-if="!isChating"
      >
        我的紀錄
      </a>
      <a class="nav-link my-auto" @click="logout" href="#"> 登出 </a>
    </div>
    <div
      class="d-flex flex-column mx-auto p-3 overflow-auto noscrollbar"
      style="height: 90%"
    >
      <Userlist
        :userlist="userlist"
        @update="newRoom"
        v-if="!isChating && !isRoomlist"
      />
      <Roomlist
        :rooms="rooms"
        @update="enterRoom"
        v-if="!isChating && isRoomlist"
      />
      <Chatlist
        :roomdata="roomdata"
        :name="userdata.name"
        @update="sent"
        v-if="isChating"
      />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../db'
import Userlist from '@/components/Userlist.vue'
import Chatlist from '@/components/Chatlist.vue'
import Roomlist from '@/components/Roomlist.vue'
const users = db.collection('users')
const messages = db.collection('messages')

export default {
  components: {
    Userlist,
    Chatlist,
    Roomlist,
  },
  data() {
    return {
      userlist: [],
      user: null,
      userdata: [],
      room: '',
      roomdata: {},
      isChating: false,
      isRoomlist: false,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        users
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.$bind('userdata', users.doc(user.uid))
            } else {
              users.doc(user.uid).set({
                name: user.displayName,
                uid: user.uid,
                rooms: [],
              })
              this.$bind('userdata', users.doc(user.uid))
            }
          })
      }
      this.$bind('userlist', users)
    })
  },
  methods: {
    enterRoom(room) {
      this.room = room
    },
    newRoom(uid, name) {
      const found = this.userdata.rooms.find((room) => room.uid == uid)
      if (found) {
        this.room = found.room
      } else {
        messages.add({ messages: [] }).then((ref) => {
          users.doc(this.userdata.uid).update({
            rooms: firebase.firestore.FieldValue.arrayUnion({
              name: name,
              room: ref.id,
              uid: uid,
            }),
          })
          users.doc(uid).update({
            rooms: firebase.firestore.FieldValue.arrayUnion({
              name: this.userdata.name,
              room: ref.id,
              uid: this.userdata.uid,
            }),
          })
          this.room = ref.id
        })
      }
    },
    sent(newchat) {
      messages.doc(this.room).update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          name: this.userdata.name,
          text: newchat,
          uid: this.userdata.uid,
          time: new Date(),
        }),
      })
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/')
        })
    },
  },
  computed: {
    rooms: function () {
      return this.userdata.rooms
    },
  },
  watch: {
    room: {
      handler(room) {
        if (room != '') {
          this.$bind('roomdata', messages.doc(room)).then(
            () => (this.isChating = true)
          )
        } else {
          this.roomdata = {}
          this.isChating = false
        }
      },
    },
  },
}
</script>

<style></style>
