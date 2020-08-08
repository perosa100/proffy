import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import styles from './styles'

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([])

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      // vem em formato de json
      if (response) {
        const favoritedTeachers = JSON.parse(response) // converte para texto
        setFavorites(favoritedTeachers)
      }
    })
  }
  useFocusEffect(() => {
    loadFavorites()
  })
  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffy disponíves" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited />
        })}
      </ScrollView>
    </View>
  )
}
export default Favorites
