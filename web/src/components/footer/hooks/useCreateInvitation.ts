import { gql, useMutation } from "@apollo/client";

const CREATE_INVITATION_MUTATION = gql`
  mutation CreateInvitation {
    createInvitation {
      id
    }
  }
`;

interface InvitationResponse {
  id: string;
}

interface CreateInvitationMutation {
  createInvitation: InvitationResponse;
}

export default function useCreateInvitation() {
  const [createInvitation] = useMutation<CreateInvitationMutation>(
    CREATE_INVITATION_MUTATION
  );

  const handleCreateInvitation = async () => {
    const result = await createInvitation();

    if (!result.data) {
      throw new Error("Couldn't create invitation");
    }

    return result.data.createInvitation;
  };

  return handleCreateInvitation;
}
