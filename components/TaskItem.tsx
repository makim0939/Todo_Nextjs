import { useMutateTask } from '@/hooks/useMutateTask'
import { List } from '@mantine/core'
import { Task } from '@prisma/client'
import { FC } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import useStore from '@/store'

export const TaskItem: FC<Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>> = ({
  id,
  title,
  description,
}) => {
  const update = useStore((state) => state.updateEditedTask)
  const { deleteTaskMutation } = useMutateTask()
  return (
    <List.Item>
      <div className="float-left mr-10">
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id,
              title,
              description,
            })
          }}
        />
        <TrashIcon
          className="text-blue cursor-pointer-500 h-5 w-5 text-blue-500"
          onClick={() => {
            deleteTaskMutation.mutate(id)
          }}
        />
      </div>
      <span>{title}</span>
    </List.Item>
  )
}
