import { useState } from "react";
import { ButtonGroup, CancelButton, Input, ModalContainer, ModalContent, ModalForm, ModalHeader, SaveButton, Textarea } from "./EditFormStyles";

interface EditFormProps {
    task: { _id: string; title: string; description: string; completed: boolean };
    onClose: () => void;
    onSave: (updatedTask: any) => void;
  }
  
  const EditForm: React.FC<EditFormProps> = ({ task, onClose, onSave }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ ...task, title, description });
    };
  
    return (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>Edit Task</ModalHeader>
            <ModalForm onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <ButtonGroup>
                <CancelButton type="button" onClick={onClose}>
                  Cancel
                </CancelButton>
                <SaveButton type="submit">Save</SaveButton>
              </ButtonGroup>
            </ModalForm>
          </ModalContent>
        </ModalContainer>
      );
  };
  
  export default EditForm;