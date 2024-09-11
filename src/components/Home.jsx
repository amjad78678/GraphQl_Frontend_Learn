import { gql, useMutation } from "@apollo/client";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const createUser = gql`
    mutation CreateUser(
      $name: String!
      $age: Int!
      $email: String!
      $password: String!
    ) {
      createUser(name: $name, age: $age, email: $email, password: $password)
    }
  `;

  const navigate = useNavigate();
  const [userRegisterMuatation, { loading, error, data }] = useMutation(
    createUser,
    {
      onCompleted: (data) => {
        console.log("iam data", data);
        toast.success(data.createUser);
        navigate("/result");
      },
      onError: (error) => {
        console.log("iam errro", error);
        toast.error(error.message);
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    console.log(formValues);
    const { age, ...rest } = formValues;
    userRegisterMuatation({ variables: { ...rest, age: parseInt(age) } });
  };
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white gap-5">
      <div className="">
        <Card className="w-96">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your name" />
              </div>
              <TextInput
                type="text"
                name="name"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your age" />
              </div>
              <TextInput
                type="text"
                name="age"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                name="email"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput
                id="password1"
                name="password"
                type="password"
                required
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </div>

      <div>
        <Button onClick={() => navigate("/result")}>Go to Result</Button>
      </div>
    </div>
  );
};

export default Home;
