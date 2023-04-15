import { useNavigate } from "react-router-dom";
import { Quiz } from "../../utils/interfaces";
import {
  ClockIcon,
  StarIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";
import Button from "../form/Button";
import { Fragment, useState } from "react";
import Modal from "../ui/Modal";

const QuizListItem = ({
  name,
  description,
  timeLimit,
  points,
  quizID,
}: Quiz) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Fragment>
      {openModal && (
        <Modal
          headerTitle={`Are you ready to take ${name} quiz?`}
          onClose={() => {
            setOpenModal(false);
          }}
        >
          Ready to take the quiz??
          <div className="grid grid-cols-2 gap-4 p-2 w-full">
            <div>
              <Button
                onClick={() => {
                  setOpenModal(false);
                }}
                size="base"
                title="No, I'm not"
                color="secondary"
                rounded="flat"
              />
            </div>
            <div>
              <Button
                onClick={() => {
                  navigate(`/quiz/${quizID}`);
                }}
                size="base"
                title="Yes, I'm ready"
                color="primary"
                rounded="flat"
              />
            </div>
          </div>
        </Modal>
      )}
      <li className="w-full p-3 flex justify-between items-center">
        <div className="flex flex-col gap-2 basis-3/4">
          <h2 className="text-lg font-semibold capitalize text-slate-700">
            {name} Quiz
          </h2>
          <p className="text-base text-slate-600">{description}</p>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center text-orange-950">
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm font-bold text-slate-700">
                {timeLimit} mins
              </span>
            </div>
            <div className="flex gap-2 items-center text-green-950">
              <StarIcon className="w-4 h-4" />
              <span className="text-sm font-bold text-slate-700">
                {points} pts
              </span>
            </div>
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
            size="base"
            title="Take Quiz"
            color="primary"
            rounded="flat"
            icon={{
              iconPosition: "right",
              iconElement: <ArrowUpRightIcon className="w-4 h-4" />,
            }}
          />
        </div>
      </li>
    </Fragment>
  );
};

export default QuizListItem;
