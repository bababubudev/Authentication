import { useState } from "react";
import Modal from "./Modal";
import { ModalType } from "../types/Modal";
import { InputParams } from "../types/FormInterface";
import FormInput from "./FormInput";

interface UserDetailCard {
  user: DefaultUser;
  toggleUserStatus: (userId: string, isActive: boolean) => Promise<void>;
  viewAuditLog: (userId: string) => Promise<void>;
  renameUser: (userId: string, newName: string) => Promise<void>;
}

function UserDetailCard({ user, toggleUserStatus, viewAuditLog, renameUser }: UserDetailCard) {
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>("");

  const inputObject: InputParams = {
    id: 1,
    label: "New name",
    name: "newName",
    type: "text",
    placeholder: "Enter a new name",
    required: true,
    errors: [
      "Please enter a new name"
    ]
  }

  return (
    <div key={user.id} className="detailed-info">
      <div>
        <h4>{user.username}</h4>
        <p>{user.email}</p>
      </div>
      <div className="buttons-container">
        <button
          onClick={() => viewAuditLog(user.id)}
          className="show-audit-btn"
        >
          Audit log
        </button>
        <button
          onClick={() => toggleUserStatus(user.id, user.is_active)}
          className="toggle-status-btn"
        >
          {user.is_active ? "Deactivate" : "Activate"}
        </button>
        <button
          onClick={() => setShowRenameModal(true)}
        >
          Rename
        </button>
      </div>
      <Modal
        isOpen={showRenameModal}
        dialogue={`Rename ${user.username}`}
        type={ModalType.form}
        description={
          <FormInput
            {...inputObject}
            value={nameValue}
            handleChange={(e) => setNameValue(e.target.value)}
          />
        }
        onSubmitForm={() => renameUser(user.id, nameValue)}
        onConfirm={() => setShowRenameModal(false)}
        onCancel={() => setShowRenameModal(false)}
      />
    </div>
  );
}

export default UserDetailCard;