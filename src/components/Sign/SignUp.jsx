import * as Form from "@radix-ui/react-form";

export default function SignUp() {
  return (
    <Form.Root>
      <Form.Field name="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Message match="valueMissing">
          Yo gang your first name missing
        </Form.Message>
        <Form.Control asChild>
          <input type="text" required />
        </Form.Control>
      </Form.Field>
      <Form.Field name="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Message match="valueMissing">
          Yo gang your last name missing
        </Form.Message>
        <Form.Control asChild>
          <input type="text" required />
        </Form.Control>
      </Form.Field>
      <Form.Field name="email">
        <Form.Label>Email</Form.Label>
        <Form.Message match="valueMissing">
          Yo gang your email missing
        </Form.Message>
        <Form.Control asChild>
          <input type="email" required />
        </Form.Control>
      </Form.Field>
      <Form.Field name="password">
        <Form.Label>Password</Form.Label>
        <Form.Message match="valueMissing">
          Yo gang your email missing
        </Form.Message>
        <Form.Control asChild>
          <input type="password" required />
        </Form.Control>
      </Form.Field>
      <Form.Field name="email">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Message match="valueMissing">
          Yo gang your email missing
        </Form.Message>
        <Form.Control asChild>
          <input type="password" required />
        </Form.Control>
      </Form.Field>
      <Form.Submit>Sign Up</Form.Submit>
    </Form.Root>
  );
}
