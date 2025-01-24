import { useState } from "react";
import Modal from "./Modal";
import { ModalType } from "../types/Modal";
import { InputParams } from "../types/FormInterface";
import FormInput from "./FormInput";

import { CgDetailsMore } from "react-icons/cg";

interface UserDetailCard {
  user: User;
  isSelected: boolean;
  onUserCardClick: (userId: string) => void;
  toggleUserStatus: (userId: string, isActive: boolean) => Promise<void>;
  viewAuditLog: (userId: string) => Promise<void>;
  renameUser: (userId: string, newName: string) => Promise<void>;
}

function UserDetailCard({ user, isSelected, onUserCardClick, toggleUserStatus, viewAuditLog, renameUser }: UserDetailCard) {
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [showActivationModal, setShowActivationModal] = useState<boolean>(false);
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
    <div
      key={user.user_id}
      className={`detailed-info ${user.role}`}
    >
      <div>
        <h4>{user.username}</h4>
        <p>{user.email}</p>
      </div>
      <div className="buttons-container">
        <button
          onClick={() => viewAuditLog(user.user_id)}
          className="show-audit-btn"
        >
          Audit log
        </button>
        <button
          onClick={() => setShowActivationModal(true)}
          className={`toggle-status-btn ${user.is_active ? "active" : "inactive"}`}
        >
          {user.is_active ? "DEACTIVATE" : "ACTIVATE"}
          <Modal
            type={ModalType.alert}
            isOpen={showActivationModal}
            dialogue={user.is_active ? "Deactivate " + user.username + "?" : "Activate " + user.username + "?"}
            description={`Are you sure you want to ${user.is_active ? "deactivate" : "activate"} ${user.username}`}
            onConfirm={() => { toggleUserStatus(user.user_id, user.is_active); setShowActivationModal(false); }}
            onCancel={() => setShowActivationModal(false)}
          />
        </button>
        <button
          onClick={() => setShowRenameModal(true)}
        >
          Rename
        </button>
        <button
          onClick={() => onUserCardClick(user.user_id)}
          className={`show-details-btn ${isSelected ? "selected" : ""}`}
        >
          <CgDetailsMore />
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
        onSubmitForm={() => renameUser(user.user_id, nameValue)}
        onConfirm={() => setShowRenameModal(false)}
        onCancel={() => setShowRenameModal(false)}
      />
    </div>
  );
}

export default UserDetailCard;