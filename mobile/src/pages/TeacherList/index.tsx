import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'
import styles from './styles'

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [subject, setSubject] = useState('Matemática')
  const [week_day, setWeekDay] = useState('1')
  const [time, setTime] = useState('09:00')
  function handleToggleFilter() {
    setIsFiltersVisible(!isFiltersVisible)
  }
  async function loadFavorites() {
    await AsyncStorage.getItem('favorites').then((response) => {
      // vem em formato de json
      if (response) {
        const favoritedTeachers = JSON.parse(response) // converte para texto
        const favoritedTeacherIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id
          }
        )
        setFavorites(favoritedTeacherIds)
      }
    })
  }

  async function handleFilterSubmit() {
    loadFavorites()

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data)
    setIsFiltersVisible(!isFiltersVisible)
  }
  useFocusEffect(() => {
    loadFavorites()
  })
  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffy disponíves"
        headerRight={
          <BorderlessButton onPress={handleToggleFilter}>
            <Feather name="filter" size={25} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              onChangeText={(text) => {
                setSubject(text)
              }}
              style={styles.input}
              placeholderTextColor="#c1bccc"
              placeholder="Qual a matéria"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={week_day}
                  onChangeText={(text) => {
                    setWeekDay(text)
                  }}
                  style={styles.input}
                  placeholderTextColor="#c1bccc"
                  placeholder="Qual dia?"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  onChangeText={(text) => {
                    setTime(text)
                  }}
                  style={styles.input}
                  placeholderTextColor="#c1bccc"
                  placeholder="Qual horário?"
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFilterSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default TeacherList
