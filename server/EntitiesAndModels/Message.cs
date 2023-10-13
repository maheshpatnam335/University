namespace EntitiesAndModels
{
    public class ReturnMessage
    {
        public string MessageContent { get; set; }

        public ReturnMessage(string messageContent)
        {
            MessageContent = messageContent;
        }
    }

    public class Result<T>
    {
        public bool HasError => ReturnMessages.Any();
        public List<ReturnMessage> Messages => ReturnMessages;
        public T? ReturnValue { get; set; }
        public List<T>? ReturnValues { get; set; }

        List<ReturnMessage> ReturnMessages = new();

        public List<ReturnMessage> AddMessageItem(ReturnMessage returnMessage)
        {
            if (returnMessage != null && returnMessage.MessageContent != null)
            {
                Messages.Add(returnMessage);

            }
            return ReturnMessages;
        }
    }
}
