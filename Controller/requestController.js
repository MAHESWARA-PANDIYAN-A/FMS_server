import RequestCollection from '../Model/requestModel.js';

export const createRequest = async (req, res) => {
    const { requestNo, date, customer, amount, plan, priority, userId } = req.body;

    try {
        const existingRequest = await RequestCollection.findOne({ requestNo });
        if (existingRequest) {
            return res.status(400).json({ message: "Request number already exists" });
        }

        const newRequest = new RequestCollection({
            requestNo,
            date,
            customer,
            amount,
            plan,
            priority,
            userId
        });

        await newRequest.save();
        res.status(201).json({ message: "Request created successfully", request: newRequest });
    } catch (err) {
        console.error("Create request error:", err);
        res.status(500).json({ message: "Error creating request" });
    }
};

export const getRequests = async (req, res) => {
    try {
        const requests = await RequestCollection.find().populate('userId', 'name email');
        res.status(200).json(requests);
    } catch (err) {
        console.error("Get requests error:", err);
        res.status(500).json({ message: "Error fetching requests" });
    }
};

export const getUserRequests = async (req, res) => {
    const { userId } = req.params;

    try {
        const requests = await RequestCollection.find({ userId });
        res.status(200).json(requests);
    } catch (err) {
        console.error("Get user requests error:", err);
        res.status(500).json({ message: "Error fetching user requests" });
    }
};

export const updateRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedRequest = await RequestCollection.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json({ message: "Request status updated", request: updatedRequest });
    } catch (err) {
        console.error("Update request error:", err);
        res.status(500).json({ message: "Error updating request" });
    }
};