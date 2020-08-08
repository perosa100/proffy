import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import warningIcon from '../../assets/images/icons/warning.svg'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import TextArea from '../../components/TextArea'
import api from '../../services/api'
import './styles.css'
interface schedule {
  week_day: number
  from: string
  to: string
}

const TeacherForm: React.FC = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')
  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')
  const [scheduleItems, setScheduleItems] = useState<schedule[]>([
    { week_day: 0, from: '', to: '' }
  ])

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }])
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: value
        }
      }
      return scheduleItem
    })
    setScheduleItems(updatedScheduleItems)
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()
    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      })
      .then(() => {
        alert('Cadastro realizado com sucesso')
        history.push('/')
      })
      .catch((error) => {
        console.log('handleCreateClass :: catch ::apiPost ', error)

        alert('Erro ao cadastrar')
      })
  }
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value)
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value)
              }}
            />
            <TextArea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value)
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value)
              }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Física', label: 'Física' },
                { value: 'Ciência', label: 'Ciência' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'História', label: 'História' },
                { value: 'Educação Fisica', label: 'Educação Fisica' },
                { value: 'Quimíca', label: 'Quimíca' },
                { value: 'Português', label: 'Português' }
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value)
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
                    value={scheduleItem.week_day}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' }
                    ]}
                  />

                  <Input
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                    value={scheduleItem.from}
                    name="from"
                    label="Das"
                    type="time"
                  />
                  <Input
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                    value={scheduleItem.to}
                    name="to"
                    label="Até"
                    type="time"
                  />
                </div>
              )
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}
export default TeacherForm
