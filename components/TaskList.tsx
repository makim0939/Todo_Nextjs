import { useQueryTaks } from '@/hooks/useQueryTaks'
import { List, Loader, ThemeIcon } from '@mantine/core'
import { IconCircleDashed } from '@tabler/icons'
import { TaskItem } from './TaskItem'

export const TaskList = () => {
  const { data: tasks, status } = useQueryTaks()
  if (status === 'loading') return <Loader my="lg" color="cyan" />

  return (
    <List
      my="lg"
      spacing="sm"
      size="sm"
      icon={
        <ThemeIcon color="cyan" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      }
    >
      {tasks?.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
        />
      ))}
    </List>
  )
}
